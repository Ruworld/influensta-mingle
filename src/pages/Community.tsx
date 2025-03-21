
import React, { useState } from 'react';
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
  Trophy,
  ShoppingBag,
  Tag,
  Megaphone,
  Store,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
      hasMerchandise: true,
      hasPromo: true,
    },
    {
      id: '2',
      name: 'Travel Creators',
      members: 7829,
      activeNow: 342,
      posts: 523,
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000',
      trending: true,
      hasMerchandise: true,
      hasPromo: false,
    },
    {
      id: '3',
      name: 'Fitness Motivation',
      members: 3156,
      activeNow: 128,
      posts: 189,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000',
      trending: false,
      hasMerchandise: false,
      hasPromo: true,
    },
    {
      id: '4',
      name: 'Tech Influencers',
      members: 2934,
      activeNow: 98,
      posts: 145,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000',
      trending: false,
      hasMerchandise: false,
      hasPromo: false,
    },
  ];

  // Sample merchandise data
  const communityMerchandise = [
    {
      id: 'm1',
      name: 'Photography Basics Guide',
      price: '₹599',
      communityId: '1',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000',
      seller: 'Photography Enthusiasts',
      type: 'digital'
    },
    {
      id: 'm2',
      name: 'Travel Journal',
      price: '₹899',
      communityId: '2',
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000',
      seller: 'Travel Creators',
      type: 'physical'
    },
  ];

  const [selectedTab, setSelectedTab] = useState('discover');

  return (
    <Layout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Community</h1>
          <Button className="bg-gradient-to-r from-fresh-blue to-fresh-teal gap-2">
            <Plus className="h-4 w-4" />
            Create Community
          </Button>
        </div>

        <div className="relative mb-6">
          <Input 
            placeholder="Search communities..." 
            className="pl-10 bg-background border-fresh-blue/20 focus-visible:ring-fresh-blue/30"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <Tabs defaultValue="discover" value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="discover" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              Discover
            </TabsTrigger>
            <TabsTrigger value="my-communities" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              My Communities
            </TabsTrigger>
            <TabsTrigger value="merchandise" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              Merchandise
            </TabsTrigger>
            <TabsTrigger value="promotions" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              Promotions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((community) => (
                <div 
                  key={community.id} 
                  className="border border-border rounded-lg overflow-hidden hover:border-fresh-blue/30 transition-all duration-300 bg-background/60 backdrop-blur-sm"
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
                        <Badge className="absolute top-3 right-3 bg-fresh-blue text-white">
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
                            <div key={i} className="h-6 w-6 rounded-full bg-fresh-blue/20 border border-background"></div>
                          ))}
                        </div>
                        <span>{community.activeNow} active now</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1 text-fresh-blue">
                          <Calendar className="h-3 w-3" />
                          <span>Next event in 2 days</span>
                        </span>
                        
                        {community.hasMerchandise && (
                          <Badge variant="outline" className="text-fresh-teal border-fresh-teal">
                            <ShoppingBag className="h-3 w-3 mr-1" /> Shop
                          </Badge>
                        )}
                        
                        {community.hasPromo && (
                          <Badge variant="outline" className="text-fresh-indigo border-fresh-indigo">
                            <Megaphone className="h-3 w-3 mr-1" /> Promo
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button size="sm" className="bg-fresh-blue text-white hover:bg-fresh-indigo">
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
              <Button className="bg-fresh-blue text-white hover:bg-fresh-indigo mt-2" onClick={() => setSelectedTab('discover')}>
                Explore Communities
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="merchandise" className="mt-0">
            <div className="bg-gradient-to-br from-fresh-blue/10 to-fresh-teal/10 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="h-5 w-5 text-fresh-blue" />
                <h3 className="font-semibold">Community Merchandise</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Browse and shop merchandise from communities you're part of. Support creators and get exclusive products.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Tag className="h-4 w-4 text-fresh-teal" />
                <span>Products are sold and shipped directly by community admins.</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {communityMerchandise.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="h-40 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <Badge className="absolute top-2 right-2 bg-fresh-teal text-white">
                      {item.type === 'digital' ? 'Digital' : 'Physical'}
                    </Badge>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">By {item.seller}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-fresh-blue">{item.price}</span>
                      <Button size="sm" className="bg-fresh-teal text-white hover:bg-fresh-blue">
                        <ShoppingBag className="h-3 w-3 mr-1" /> Buy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border border-dashed flex flex-col items-center justify-center py-6 px-4 text-center">
                <Store className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="font-medium mb-1">Sell Your Own Products</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create and sell merchandise to your community members
                </p>
                <Button className="bg-fresh-blue text-white hover:bg-fresh-indigo gap-1">
                  <Plus className="h-4 w-4" /> Create Store
                </Button>
              </Card>
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="ghost" className="text-fresh-blue hover:bg-fresh-blue/10 gap-1">
                View All Community Products <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="promotions" className="mt-0">
            <div className="bg-gradient-to-br from-fresh-blue/10 to-fresh-indigo/10 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Megaphone className="h-5 w-5 text-fresh-indigo" />
                <h3 className="font-semibold">Community Promotions</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Find special offers, deals, and promotions from communities you're part of. Limited-time opportunities you won't want to miss.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-4 w-4 text-fresh-indigo" />
                <span>Promotions are time-limited and may expire soon.</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-fresh-blue to-fresh-indigo p-4 text-white">
                  <Badge className="bg-white text-fresh-indigo mb-2">Photography Enthusiasts</Badge>
                  <h3 className="text-xl font-bold mb-1">50% OFF Premium Presets Bundle</h3>
                  <p className="text-sm opacity-90 mb-3">
                    Get our exclusive collection of 25 premium Lightroom presets at half price. Limited offer until June 30th!
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm line-through opacity-70">₹1,999</span>
                      <span className="text-xl font-bold">₹999</span>
                    </div>
                    <Button className="bg-white text-fresh-indigo hover:bg-white/90">
                      Get Offer
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-fresh-teal to-fresh-lime p-4 text-white">
                  <Badge className="bg-white text-fresh-teal mb-2">Fitness Motivation</Badge>
                  <h3 className="text-xl font-bold mb-1">Free 7-Day Training Challenge</h3>
                  <p className="text-sm opacity-90 mb-3">
                    Join our exclusive 7-day home workout challenge. Get daily workout plans, nutrition tips, and motivation from top fitness creators.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm line-through opacity-70">₹499</span>
                      <span className="text-xl font-bold">FREE</span>
                    </div>
                    <Button className="bg-white text-fresh-teal hover:bg-white/90">
                      Join Challenge
                    </Button>
                  </div>
                </div>
              </Card>
              
              <div className="text-center mt-2">
                <Button variant="ghost" className="text-fresh-indigo hover:bg-fresh-indigo/10 gap-1">
                  Create Your Own Promotion <Megaphone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Community;
