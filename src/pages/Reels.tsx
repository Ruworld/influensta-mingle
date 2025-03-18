
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Play, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

const Reels = () => {
  // Sample reels data
  const reels = [
    {
      id: '1',
      username: 'alex_cam',
      description: 'Morning routine in NYC #morningroutine #nyc',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-happily-in-a-field-of-tall-grass-4702-large.mp4',
      likes: '42.5K',
      comments: '1.2K',
      isLiked: false,
    },
    {
      id: '2',
      username: 'travel_emma',
      description: 'Sunset in Bali - most magical place ever! #bali #sunset #travel',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-waving-outdoors-1556-large.mp4',
      likes: '89.7K',
      comments: '3.4K',
      isLiked: true,
    },
    {
      id: '3',
      username: 'fitnessguru',
      description: 'Try this 1-minute workout challenge! #fitness #workout',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-woman-dancing-in-front-of-bright-light-4809-large.mp4',
      likes: '67.2K',
      comments: '982',
      isLiked: false,
    },
  ];

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Reels</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {reels.map((reel) => (
            <div key={reel.id} className="bg-background border border-border rounded-lg shadow-sm overflow-hidden">
              <div className="p-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-accent/20"></div>
                  <span className="font-medium">@{reel.username}</span>
                </div>
              </div>
              
              <div className="relative aspect-[9/16] bg-black">
                <video 
                  src={reel.videoUrl} 
                  className="h-full w-full object-cover"
                  controls
                  poster="https://via.placeholder.com/480x854/111827?text=Reel"
                />
                
                <div className="absolute right-3 bottom-16 flex flex-col gap-4">
                  <Button size="icon" variant="ghost" className="bg-background/30 hover:bg-background/50 text-white rounded-full h-10 w-10">
                    <Heart className={`h-5 w-5 ${reel.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button size="icon" variant="ghost" className="bg-background/30 hover:bg-background/50 text-white rounded-full h-10 w-10">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="bg-background/30 hover:bg-background/50 text-white rounded-full h-10 w-10">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="bg-background/30 hover:bg-background/50 text-white rounded-full h-10 w-10">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-3">
                <p className="text-sm mb-1">{reel.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{reel.likes} likes</span>
                  <span>{reel.comments} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reels;
