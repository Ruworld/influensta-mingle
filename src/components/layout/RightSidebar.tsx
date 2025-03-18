
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, UserPlus, TrendingUp, Users } from 'lucide-react';

export const RightSidebar = () => {
  // Sample trending hashtags
  const trendingHashtags = [
    { tag: 'photography', count: '254K' },
    { tag: 'technology', count: '182K' },
    { tag: 'travel', count: '143K' },
    { tag: 'webdesign', count: '96K' },
    { tag: 'productivity', count: '72K' },
  ];

  // Sample suggested connections
  const suggestedConnections = [
    { id: '1', name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?img=1', role: 'UX Designer' },
    { id: '2', name: 'Jamie Chen', avatar: 'https://i.pravatar.cc/150?img=2', role: 'Product Manager' },
    { id: '3', name: 'Taylor Swift', avatar: 'https://i.pravatar.cc/150?img=3', role: 'Software Engineer' },
  ];

  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-[280px] border-l border-border bg-background/80 backdrop-blur-md overflow-y-auto py-6 px-4 hidden md:block">
      <div className="space-y-6">
        {/* Trending section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Trending Hashtags</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.map((item) => (
              <Badge key={item.tag} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                #{item.tag} <span className="ml-1 text-xs text-muted-foreground">{item.count}</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Suggested connections */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Suggested Connections</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {suggestedConnections.map((person) => (
              <div key={person.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={person.avatar} alt={person.name} className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.role}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full text-sm text-muted-foreground">
            View More
          </Button>
        </div>

        {/* Premium section */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-4 rounded-lg border border-border space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            <h3 className="font-semibold">Upgrade to Premium</h3>
          </div>
          <p className="text-sm text-muted-foreground">Get exclusive features and boost your influence!</p>
          <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">Upgrade Now</Button>
        </div>

      </div>
    </aside>
  );
};
