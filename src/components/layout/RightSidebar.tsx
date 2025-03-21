
import React, { useState, useEffect } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { UserCheck, UserPlus, TrendingUp, Users, Flame, Zap } from 'lucide-react';

// Define the missing data structures
const trendingHashtags = [
  { tag: 'photography', count: 2452 },
  { tag: 'startup', count: 1893 },
  { tag: 'marketing', count: 1527 },
  { tag: 'creator', count: 1204 },
  { tag: 'travel', count: 984 }
];

const suggestedConnections = [
  {
    id: 1,
    name: 'Alex Rivera',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=1',
    followers: '12.4K',
    viralPosts: 15,
    isActive: true
  },
  {
    id: 2,
    name: 'Jamie Wong',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=2',
    followers: '8.2K',
    viralPosts: 11,
    isActive: false
  },
  {
    id: 3,
    name: 'Sasha Kumar',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=3',
    followers: '5.7K',
    viralPosts: 7,
    isActive: true
  }
];

export const RightSidebar = () => {
  const [recentProfiles, setRecentProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentProfiles();
  }, []);

  const fetchRecentProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentProfiles(data || []);
    } catch (error) {
      console.error('Error fetching recent profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-[280px] border-l border-border bg-background/80 backdrop-blur-md overflow-y-auto py-6 px-3 hidden lg:block">
      <div className="space-y-6">
        {/* Recent Profiles Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">New Members</h3>
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentProfiles.length > 0 ? (
            <div className="space-y-4">
              {recentProfiles.map((profile) => (
                <div key={profile.id} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img 
                      src={profile.avatar_url || `https://source.unsplash.com/random/100x100/?portrait=${profile.id}`} 
                      alt={profile.full_name || 'User'} 
                      className="h-full w-full object-cover"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Link to={`/profile/${profile.id}`} className="font-medium hover:text-accent">
                        {profile.full_name || 'Anonymous'}
                      </Link>
                      {profile.is_verified && (
                        <Badge variant="secondary" className="h-4">Verified</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">@{profile.username}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="ml-auto">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">No profiles found</p>
          )}
        </div>

        {/* Trending section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Trending Hashtags</h3>
            <TrendingUp className="h-4 w-4 text-fresh-blue" />
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.map((item) => (
              <Badge key={item.tag} variant="secondary" className="cursor-pointer hover:bg-fresh-blue/10 hover:text-fresh-blue transition-colors duration-200">
                #{item.tag} <span className="ml-1 text-xs text-muted-foreground">{item.count}</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Suggested connections with FOMO elements */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Suggested Connections</h3>
            <Users className="h-4 w-4 text-fresh-blue" />
          </div>
          <div className="space-y-3">
            {suggestedConnections.map((person) => (
              <div key={person.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-fresh-indigo/5 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <img src={person.avatar} alt={person.name} className="h-10 w-10 rounded-full object-cover border-2 border-fresh-indigo" />
                    {person.isActive && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium">{person.name}</p>
                      {person.viralPosts > 10 && (
                        <Flame className="h-3 w-3 text-fresh-lime" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-fresh-blue font-medium">{person.followers}</span>
                      </p>
                      <p className="text-xs flex items-center gap-1">
                        <Zap className="h-3 w-3 text-muted-foreground" />
                        <span className="text-fresh-lime font-medium">{person.viralPosts} viral</span>
                      </p>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="hover:bg-fresh-indigo/10 hover:text-fresh-indigo">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:bg-fresh-indigo/10 hover:text-fresh-indigo">
            View More
          </Button>
        </div>

        {/* Content Boosting Banner - replacing Premium */}
        <div className="bg-gradient-to-br from-fresh-indigo/20 to-fresh-blue/20 p-4 rounded-lg border border-fresh-blue/20 space-y-3 animate-pulse-scale">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-fresh-lime" />
            <h3 className="font-semibold">Boost Your Content</h3>
          </div>
          <p className="text-sm text-muted-foreground">Get <span className="text-fresh-blue font-semibold">5x more views</span> and reach a wider audience!</p>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <p className="text-xs text-center">Starting at</p>
              <p className="text-center font-bold text-fresh-blue">₹100/day</p>
            </div>
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <p className="text-xs text-center">Current users</p>
              <p className="text-center font-bold text-fresh-blue">12.5K</p>
            </div>
          </div>
          <Button size="sm" className="w-full bg-gradient-to-r from-fresh-blue to-fresh-indigo hover:opacity-90">
            Boost Now
          </Button>
        </div>
      </div>
    </aside>
  );
};
