
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Heart, 
  Share, 
  MoreHorizontal, 
  Bookmark
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

interface FeedPostProps {
  post: {
    id: string;
    username: string;
    handle: string;
    avatar: string;
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
    liked?: boolean;
    saved?: boolean;
  };
}

export const FeedPost = ({ post }: FeedPostProps) => {
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(post.saved || false);
  
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };
  
  const handleSave = () => {
    setIsSaved(!isSaved);
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
      
      <div className="flex items-center justify-between pt-2 text-muted-foreground text-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 px-2 h-8 text-muted-foreground hover:text-foreground"
            onClick={handleLike}
          >
            <Heart
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
    </div>
  );
};
