
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Share, 
  MoreHorizontal, 
  Bookmark,
  Play
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommentSection } from '@/components/feed/CommentSection';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FeedPostProps {
  post: {
    id: string;
    username: string;
    handle: string;
    avatar: string;
    content: string;
    image?: string;
    video?: {
      url: string;
      type: 'reel' | 'fullVideo';
    };
    timestamp: string;
    likes: number;
    dislikes?: number;
    comments: number;
    shares: number;
    liked?: boolean;
    disliked?: boolean;
    saved?: boolean;
    isVerified?: boolean;
    isTrending?: boolean;
  };
}

export const FeedPost = ({ post }: FeedPostProps) => {
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [isDisliked, setIsDisliked] = useState(post.disliked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [dislikeCount, setDislikeCount] = useState(post.dislikes || 0);
  const [isSaved, setIsSaved] = useState(post.saved || false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user } = useAuth();
  
  const handleLike = async () => {
    if (!user) {
      toast.error("Please sign in to like posts");
      return;
    }

    try {
      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      } else {
        // Add like
        // If post was disliked, remove the dislike first
        if (isDisliked) {
          setDislikeCount(dislikeCount - 1);
          setIsDisliked(false);
        }
        
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: post.id,
            user_id: user.id
          });
          
        if (error) throw error;
        
        setLikeCount(likeCount + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error handling like:', error);
      toast.error("Failed to process your like");
    }
  };
  
  const handleDislike = () => {
    if (!user) {
      toast.error("Please sign in to dislike posts");
      return;
    }
    
    if (isDisliked) {
      setDislikeCount(dislikeCount - 1);
      setIsDisliked(false);
    } else {
      setDislikeCount(dislikeCount + 1);
      setIsDisliked(true);
      
      // If the post was liked, remove the like
      if (isLiked) {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }
    }
  };
  
  const handleSave = () => {
    if (!user) {
      toast.error("Please sign in to save posts");
      return;
    }
    
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Post removed from saved items" : "Post saved successfully");
  };
  
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleComments = () => {
    if (!showComments && !user) {
      toast.error("Please sign in to view comments");
      return;
    }
    
    setShowComments(!showComments);
  };
  
  return (
    <div className="glass-panel p-4 mb-4 animate-scale-in">
      <div className="flex items-start justify-between mb-3">
        <Link to={`/profile/${post.handle}`} className="flex items-center gap-3 group">
          <Avatar className="h-10 w-10 border border-border group-hover:border-accent transition-colors">
            <AvatarImage src={post.avatar} alt={post.username} />
            <AvatarFallback>{post.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col">
            <span className="font-medium text-foreground group-hover:text-accent transition-colors">{post.username}</span>
            <span className="text-xs text-muted-foreground">@{post.handle}</span>
          </div>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mute</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="mb-3">
        <p className="text-foreground leading-relaxed whitespace-pre-line">{post.content}</p>
      </div>
      
      {post.image && (
        <div className="mb-3 overflow-hidden rounded-lg">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full h-auto object-cover hover-scale max-h-[500px]" 
            loading="lazy"
          />
        </div>
      )}
      
      {post.video && (
        <div className="mb-3 overflow-hidden rounded-lg relative">
          <video 
            ref={videoRef}
            src={post.video.url}
            className="w-full h-auto object-cover hover-scale max-h-[500px]"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls
          />
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              onClick={toggleVideoPlay}
            >
              <div className="h-16 w-16 rounded-full bg-black/50 flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>
          )}
          {post.video.type === 'reel' && (
            <div className="absolute top-2 left-2 bg-accent/70 text-white text-xs px-2 py-1 rounded-full">
              Reel
            </div>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between pt-2 text-muted-foreground text-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 px-2 h-8 text-muted-foreground hover:text-foreground"
            onClick={handleLike}
          >
            <ThumbsUp
              className={cn(
                "h-4 w-4 transition-all",
                isLiked ? "fill-accent text-accent" : ""
              )}
            />
            <span>{likeCount}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 px-2 h-8 text-muted-foreground hover:text-foreground"
            onClick={handleDislike}
          >
            <ThumbsDown
              className={cn(
                "h-4 w-4 transition-all",
                isDisliked ? "fill-destructive text-destructive" : ""
              )}
            />
            <span>{dislikeCount}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 px-2 h-8 text-muted-foreground hover:text-foreground"
            onClick={toggleComments}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 px-2 h-8 text-muted-foreground hover:text-foreground"
          >
            <Share className="h-4 w-4" />
            <span>{post.shares}</span>
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={handleSave}
        >
          <Bookmark
            className={cn(
              "h-4 w-4 transition-all",
              isSaved ? "fill-foreground" : ""
            )}
          />
        </Button>
      </div>
      
      <div className="mt-3 text-xs text-muted-foreground">
        {post.timestamp}
      </div>
      
      {showComments && (
        <div className="mt-4 pt-3 border-t border-border">
          <CommentSection postId={post.id} />
        </div>
      )}
    </div>
  );
};
