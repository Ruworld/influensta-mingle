
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, UserPlus, Users, Zap, Flame } from 'lucide-react';

export const RightSidebar = () => {
  // Sample trending hashtags
  const trendingHashtags = [
    { tag: 'photography', count: '254K' },
    { tag: 'technology', count: '182K' },
    { tag: 'travel', count: '143K' },
    { tag: 'webdesign', count: '96K' },
    { tag: 'productivity', count: '72K' },
  ];

  // Sample suggested connections with followers and viral posts
  const suggestedConnections = [
    { 
      id: '1', 
      name: 'Alex Morgan', 
      avatar: 'https://i.pravatar.cc/150?img=1', 
      followers: '142.5K',
      viralPosts: 8,
      isActive: true
    },
    { 
      id: '2', 
      name: 'Jamie Chen', 
      avatar: 'https://i.pravatar.cc/150?img=2', 
      followers: '89.7K',
      viralPosts: 5,
      isActive: false
    },
    { 
      id: '3', 
      name: 'Taylor Swift', 
      avatar: 'https://i.pravatar.cc/150?img=3', 
      followers: '4.2M',
      viralPosts: 26,
      isActive: true
    },
  ];

  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-[280px] border-l border-border bg-background/80 backdrop-blur-md overflow-y-auto py-6 px-4 hidden md:block">
      <div className="space-y-6">
        {/* Trending section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Trending Hashtags</h3>
            <TrendingUp className="h-4 w-4 text-vibrant-pink" />
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.map((item) => (
              <Badge key={item.tag} variant="secondary" className="cursor-pointer hover:bg-vibrant-pink/10 hover:text-vibrant-pink transition-colors duration-200">
                #{item.tag} <span className="ml-1 text-xs text-muted-foreground">{item.count}</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Suggested connections with FOMO elements */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Suggested Connections</h3>
            <Users className="h-4 w-4 text-vibrant-pink" />
          </div>
          <div className="space-y-3">
            {suggestedConnections.map((person) => (
              <div key={person.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-vibrant-purple/5 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <img src={person.avatar} alt={person.name} className="h-10 w-10 rounded-full object-cover border-2 border-vibrant-pink" />
                    {person.isActive && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium">{person.name}</p>
                      {person.viralPosts > 10 && (
                        <Flame className="h-3 w-3 text-vibrant-orange" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-vibrant-blue font-medium">{person.followers}</span>
                      </p>
                      <p className="text-xs flex items-center gap-1">
                        <Zap className="h-3 w-3 text-muted-foreground" />
                        <span className="text-vibrant-orange font-medium">{person.viralPosts} viral</span>
                      </p>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="hover:bg-vibrant-pink/10 hover:text-vibrant-pink">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:bg-vibrant-pink/10 hover:text-vibrant-pink">
            View More
          </Button>
        </div>

        {/* Content Boosting Banner - replacing Premium */}
        <div className="bg-gradient-to-br from-vibrant-purple/20 to-vibrant-pink/20 p-4 rounded-lg border border-vibrant-pink/20 space-y-3 animate-pulse-scale">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-vibrant-yellow" />
            <h3 className="font-semibold">Boost Your Content</h3>
          </div>
          <p className="text-sm text-muted-foreground">Get <span className="text-vibrant-pink font-semibold">5x more views</span> and reach a wider audience!</p>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <p className="text-xs text-center">Starting at</p>
              <p className="text-center font-bold text-vibrant-pink">₹100/day</p>
            </div>
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <p className="text-xs text-center">Current users</p>
              <p className="text-center font-bold text-vibrant-pink">12.5K</p>
            </div>
          </div>
          <Button size="sm" className="w-full bg-gradient-to-r from-vibrant-pink to-vibrant-purple hover:opacity-90">
            Boost Now
          </Button>
        </div>
      </div>
    </aside>
  );
};
