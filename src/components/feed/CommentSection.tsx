
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface CommentSectionProps {
  postId: string;
}

interface Comment {
  id: string;
  author: {
    id: string;
    username: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  likes: number;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, profile } = useAuth();
  
  useEffect(() => {
    fetchComments();
  }, [postId]);
  
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:user_id (id, username, full_name, avatar_url)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        // Transform the data
        const transformedComments = data.map(comment => {
          // Very basic sentiment analysis - just for demo
          const content = comment.content.toLowerCase();
          let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
          
          const positiveWords = ['good', 'great', 'awesome', 'amazing', 'love', 'like', 'fantastic', 'excellent'];
          const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'poor', 'horrible'];
          
          if (positiveWords.some(word => content.includes(word))) {
            sentiment = 'positive';
          } else if (negativeWords.some(word => content.includes(word))) {
            sentiment = 'negative';
          }
          
          return {
            id: comment.id,
            author: {
              id: comment.profiles.id,
              username: comment.profiles.full_name || 'User',
              handle: comment.profiles.username || 'user',
              avatar: comment.profiles.avatar_url || 'https://source.unsplash.com/random/100x100/?portrait=1',
            },
            content: comment.content,
            timestamp: formatDistanceToNow(new Date(comment.created_at), { addSuffix: true }),
            sentiment,
            likes: Math.floor(Math.random() * 10) // Just for demo
          };
        });
        
        setComments(transformedComments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const positiveComments = comments.filter(comment => comment.sentiment === 'positive');
  const negativeComments = comments.filter(comment => comment.sentiment === 'negative');
  
  const filteredComments = activeTab === 'all' 
    ? comments 
    : activeTab === 'positive' 
      ? positiveComments 
      : negativeComments;
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    if (!user) {
      toast.error("Please sign in to add a comment");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: newComment.trim()
        });
      
      if (error) throw error;
      
      setNewComment('');
      await fetchComments(); // Refresh comments
      toast.success("Comment added successfully");
    } catch (error: any) {
      console.error('Error submitting comment:', error);
      toast.error(error.message || "Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Comments ({comments.length})</h3>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All ({comments.length})</TabsTrigger>
          <TabsTrigger value="positive">
            <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
            Positive ({positiveComments.length})
          </TabsTrigger>
          <TabsTrigger value="negative">
            <ThumbsDown className="h-3.5 w-3.5 mr-1.5" />
            Negative ({negativeComments.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-3 mt-3">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex gap-3 animate-pulse">
                <div className="h-8 w-8 rounded-full bg-muted"></div>
                <div className="flex-1">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="h-4 w-24 bg-muted-foreground/20 rounded mb-2"></div>
                    <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            renderComments(filteredComments)
          )}
        </TabsContent>
        
        <TabsContent value="positive" className="space-y-3 mt-3">
          {renderComments(filteredComments)}
        </TabsContent>
        
        <TabsContent value="negative" className="space-y-3 mt-3">
          {renderComments(filteredComments)}
        </TabsContent>
      </Tabs>
      
      <form onSubmit={handleSubmitComment} className="flex gap-2 pt-2">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
          disabled={isSubmitting || !user}
        />
        <Button 
          type="submit" 
          disabled={!newComment.trim() || isSubmitting || !user}
          className="bg-accent hover:bg-accent/90"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            "Post"
          )}
        </Button>
      </form>
    </div>
  );
};

// Helper function to render comments
function renderComments(comments: Comment[]) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No comments to display
      </div>
    );
  }
  
  return comments.map(comment => (
    <div key={comment.id} className="flex gap-3">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={comment.author.avatar} alt={comment.author.username} />
        <AvatarFallback>{comment.author.username.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className={cn(
          "bg-muted p-3 rounded-lg",
          comment.sentiment === 'positive' ? "border-l-2 border-green-500" : 
          comment.sentiment === 'negative' ? "border-l-2 border-red-500" : ""
        )}>
          <div className="flex justify-between mb-1">
            <span className="font-medium text-sm">{comment.author.username}</span>
            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
        </div>
        
        <div className="flex items-center gap-2 mt-1 ml-2">
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <ThumbsUp className="h-3 w-3 mr-1" />
            {comment.likes}
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            Reply
          </Button>
        </div>
      </div>
    </div>
  ));
}
