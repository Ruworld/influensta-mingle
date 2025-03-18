
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Bookmark, Sparkles } from 'lucide-react';

const Shorts = () => {
  // Sample shorts data
  const shorts = [
    {
      id: '1',
      username: 'quicktips',
      description: 'How to make perfect pancakes in 30 seconds #cooking #quicktips',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-adding-flour-to-make-bread-batter-1195-large.mp4',
      likes: '56.8K',
      dislikes: '432',
      comments: '984',
      isLiked: false,
    },
    {
      id: '2',
      username: 'crafty_ideas',
      description: 'DIY phone stand with just paper clips! #crafts #lifehacks',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-watch-with-the-stopwatch-running-32808-large.mp4',
      likes: '124K',
      dislikes: '871',
      comments: '2.6K',
      isLiked: true,
    },
    {
      id: '3',
      username: 'tech_ninja',
      description: 'This keyboard shortcut will save you hours! #tech #productivity',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-typing-on-smartphone-in-the-dark-1352-large.mp4',
      likes: '78.3K',
      dislikes: '654',
      comments: '1.4K',
      isLiked: false,
    },
  ];

  return (
    <Layout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Shorts</h1>
          <Button variant="outline" size="sm" className="gap-1">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span>Trending</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {shorts.map((short) => (
            <div key={short.id} className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-accent/20"></div>
                  <span className="font-medium">@{short.username}</span>
                </div>
              </div>
              
              <div className="relative aspect-video bg-black">
                <video 
                  src={short.videoUrl} 
                  className="h-full w-full object-cover"
                  controls
                  poster="https://via.placeholder.com/640x360/111827?text=Short+Video"
                />
              </div>
              
              <div className="p-4">
                <p className="text-sm mb-3">{short.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-1.5 h-8">
                      <ThumbsUp className={`h-4 w-4 ${short.isLiked ? 'fill-accent text-accent' : ''}`} />
                      <span>{short.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 h-8">
                      <ThumbsDown className="h-4 w-4" />
                      <span>{short.dislikes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 h-8">
                      <MessageCircle className="h-4 w-4" />
                      <span>{short.comments}</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shorts;
