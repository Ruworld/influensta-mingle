
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CommentSectionProps {
  postId: string;
}

// Mock comments data
const mockComments = {
  '1': [
    {
      id: '1',
      author: {
        username: 'Emma Thompson',
        handle: 'emmathompson',
        avatar: 'https://source.unsplash.com/random/100x100/?portrait=8',
      },
      content: 'This is absolutely fantastic! Love your work!',
      timestamp: '1 hour ago',
      sentiment: 'positive' as const,
      likes: 12,
    },
    {
      id: '2',
      author: {
        username: 'Alex Chen',
        handle: 'alexchen',
        avatar: 'https://source.unsplash.com/random/100x100/?portrait=9',
      },
      content: 'I don\'t think this is your best work. The lighting seems off.',
      timestamp: '2 hours ago',
      sentiment: 'negative' as const,
      likes: 3,
    },
    {
      id: '3',
      author: {
        username: 'Jordan Rivera',
        handle: 'jordanrivera',
        avatar: 'https://source.unsplash.com/random/100x100/?portrait=10',
      },
      content: 'So inspiring! Can you share more about your process?',
      timestamp: '3 hours ago',
      sentiment: 'positive' as const,
      likes: 8,
    },
    {
      id: '4',
      author: {
        username: 'Taylor Kim',
        handle: 'taylorkim',
        avatar: 'https://source.unsplash.com/random/100x100/?portrait=11',
      },
      content: 'The composition feels a bit amateur compared to your usual standard.',
      timestamp: '5 hours ago',
      sentiment: 'negative' as const,
      likes: 1,
    },
  ],
  '2': [
    {
      id: '1',
      author: {
        username: 'Morgan Smith',
        handle: 'morgansmith',
        avatar: 'https://source.unsplash.com/random/100x100/?portrait=12',
      },
      content: 'I love this cafe too! Perfect work environment.',
      timestamp: '30 min ago',
      sentiment: 'positive' as const,
      likes: 5,
    },
  ],
};

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const comments = mockComments[postId as keyof typeof mockComments] || [];
  
  const positiveComments = comments.filter(comment => comment.sentiment === 'positive');
  const negativeComments = comments.filter(comment => comment.sentiment === 'negative');
  
  const filteredComments = activeTab === 'all' 
    ? comments 
    : activeTab === 'positive' 
      ? positiveComments 
      : negativeComments;
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Here we would normally send the comment to an API
    console.log("New comment:", newComment);
    setNewComment('');
    
    // For demo purposes, we're not actually adding the comment to the list
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
          {renderComments(filteredComments)}
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
        />
        <Button type="submit" disabled={!newComment.trim()}>Post</Button>
      </form>
    </div>
  );
};

// Helper function to render comments
function renderComments(comments: Array<{
  id: string;
  author: {
    username: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  sentiment: 'positive' | 'negative';
  likes: number;
}>) {
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
