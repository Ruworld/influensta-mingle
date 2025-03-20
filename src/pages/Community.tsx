
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  MessageCircle, 
  UserPlus, 
  Search, 
  Plus, 
  Calendar,
  Flame,
  Trophy 
} from 'lucide-react';

const Community = () => {
  // Sample communities data
  const communities = [
    {
      id: '1',
      name: 'Photography Enthusiasts',
      members: 4285,
      activeNow: 152,
      posts: 287,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000',
      trending: true,
    },
    {
      id: '2',
      name: 'Travel Creators',
      members: 7829,
      activeNow: 342,
      posts: 523,
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000',
      trending: true,
    },
    {
      id: '3',
      name: 'Fitness Motivation',
      members: 3156,
      activeNow: 128,
      posts: 189,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000',
      trending: false,
    },
    {
      id: '4',
      name: 'Tech Influencers',
      members: 2934,
      activeNow: 98,
      posts: 145,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000',
      trending: false,
    },
  ];

  return (
    <Layout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Community</h1>
          <Button className="bg-gradient-to-r from-vibrant-pink to-vibrant-purple gap-2">
            <Plus className="h-4 w-4" />
            Create Community
          </Button>
        </div>

        <div className="relative mb-6">
          <Input 
            placeholder="Search communities..." 
            className="pl-10 bg-background border-vibrant-pink/20 focus-visible:ring-vibrant-pink/30"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <Tabs defaultValue="discover" className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="discover" className="data-[state=active]:bg-vibrant-pink/20 data-[state=active]:text-vibrant-pink">
              Discover
            </TabsTrigger>
            <TabsTrigger value="my-communities" className="data-[state=active]:bg-vibrant-pink/20 data-[state=active]:text-vibrant-pink">
              My Communities
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-vibrant-pink/20 data-[state=active]:text-vibrant-pink">
              Trending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((community) => (
                <div 
                  key={community.id} 
                  className="border border-border rounded-lg overflow-hidden hover:border-vibrant-pink/30 transition-all duration-300 bg-background/60 backdrop-blur-sm"
                >
                  <div className="h-32 relative">
                    <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <div>
                        <h3 className="text-white font-semibold">{community.name}</h3>
                        <div className="flex items-center gap-2 text-white/80 text-xs">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" /> {community.members.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" /> {community.posts}
                          </span>
                        </div>
                      </div>
                      {community.trending && (
                        <Badge className="absolute top-3 right-3 bg-vibrant-pink text-white">
                          <Flame className="h-3 w-3 mr-1" /> Trending
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <div className="flex -space-x-2 mr-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="h-6 w-6 rounded-full bg-vibrant-purple/20 border border-background"></div>
                          ))}
                        </div>
                        <span>{community.activeNow} active now</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-vibrant-pink">
                        <Calendar className="h-3 w-3" />
                        <span>Next event in 2 days</span>
                      </div>
                    </div>
                    
                    <Button size="sm" className="bg-vibrant-pink text-white hover:bg-vibrant-purple">
                      <UserPlus className="h-4 w-4 mr-1" /> Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my-communities" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 border border-dashed border-border rounded-lg">
              <Users className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">You haven't joined any communities yet</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Communities are groups of people with similar interests. Join communities to connect with others, share ideas, and collaborate.
              </p>
              <Button className="bg-vibrant-pink text-white hover:bg-vibrant-purple mt-2">Explore Communities</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-0">
            <div className="bg-gradient-to-br from-vibrant-pink/10 to-vibrant-purple/10 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-vibrant-pink" />
                <h3 className="font-semibold">Trending Communities</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Join the fastest growing communities on the platform and connect with like-minded creators.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Trophy className="h-4 w-4 text-vibrant-yellow" />
                <span>Updated in real-time based on member activity and engagement.</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {communities
                .filter(c => c.trending)
                .map((community) => (
                <div 
                  key={community.id} 
                  className="border border-border rounded-lg overflow-hidden hover:border-vibrant-pink/30 transition-all duration-300 bg-background/60 backdrop-blur-sm"
                >
                  <div className="h-32 relative">
                    <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <div>
                        <h3 className="text-white font-semibold">{community.name}</h3>
                        <div className="flex items-center gap-2 text-white/80 text-xs">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" /> {community.members.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" /> {community.posts}
                          </span>
                        </div>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-vibrant-pink text-white">
                        <Flame className="h-3 w-3 mr-1" /> Trending
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <div className="flex -space-x-2 mr-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="h-6 w-6 rounded-full bg-vibrant-purple/20 border border-background"></div>
                          ))}
                        </div>
                        <span>{community.activeNow} active now</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-vibrant-pink">
                        <TrendingUp className="h-3 w-3" />
                        <span>Growing fast • +{Math.floor(community.members * 0.12)} this week</span>
                      </div>
                    </div>
                    
                    <Button size="sm" className="bg-vibrant-pink text-white hover:bg-vibrant-purple">
                      <UserPlus className="h-4 w-4 mr-1" /> Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Community;
