import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { CollabRequest } from '@/components/profile/CollabRequest';
import { Badge } from '@/components/ui/badge';
import { InfluencerRanking } from '@/components/profile/InfluencerRanking';

import {
  MessageCircle,
  Users,
  ImageIcon,
  Bookmark,
  Heart,
  Share2,
  BarChart3,
  Calendar,
  Award,
  MapPin,
  Link2,
  Mail,
  Grid,
  List,
  BookMarked,
  Lock,
  UserPlus,
  MoreHorizontal,
  Play,
  Trophy
} from 'lucide-react';

// Sample user profile data
const profileData = {
  id: "1",
  username: "alex_rivera",
  displayName: "Alex Rivera",
  avatar: "https://source.unsplash.com/random/200x200/?portrait=2",
  coverImage: "https://source.unsplash.com/random/1200x300/?landscape",
  bio: "Digital creator | Photography & Travel | Based in San Francisco | Open to collaborations",
  postsCount: 128,
  followersCount: 12532,
  followingCount: 542,
  isVerified: true,
  isFollowing: false,
  location: "San Francisco, CA",
  website: "alexrivera.com",
  email: "alex@example.com"
};

// Sample user posts
const userPosts = [
  {
    id: '1',
    image: 'https://source.unsplash.com/random/600x600/?travel=1',
    likes: 423,
    comments: 42,
    caption: 'Golden Gate Park on a sunny day. The perfect light for photography! #sanfrancisco #photography',
    date: '2 days ago',
  },
  {
    id: '2',
    image: 'https://source.unsplash.com/random/600x600/?city=1',
    likes: 287,
    comments: 19,
    caption: 'Downtown vibes. The city never sleeps. #cityscape #urban',
    date: '5 days ago',
  },
  {
    id: '3',
    image: 'https://source.unsplash.com/random/600x600/?nature=1',
    likes: 512,
    comments: 31,
    caption: 'Escape to nature. Sometimes you need to disconnect to reconnect. #nature #mindfulness',
    date: '1 week ago',
  },
  {
    id: '4',
    image: 'https://source.unsplash.com/random/600x600/?food=1',
    likes: 198,
    comments: 24,
    caption: 'Trying out this new café in town. The pastries are to die for! #foodie #café',
    date: '1 week ago',
  },
  {
    id: '5',
    image: 'https://source.unsplash.com/random/600x600/?portrait=1',
    likes: 345,
    comments: 37,
    caption: 'Portrait session with @emma_styles. Capturing moments, creating memories. #portrait #photography',
    date: '2 weeks ago',
  },
  {
    id: '6',
    image: 'https://source.unsplash.com/random/600x600/?sunset=1',
    likes: 602,
    comments: 53,
    caption: 'Sunset chasing. The golden hour never disappoints. #sunset #goldenhour',
    date: '3 weeks ago',
  },
];

// Sample reels
const userReels = [
  {
    id: '1',
    thumbnail: 'https://source.unsplash.com/random/400x600/?travel=1',
    views: '12.5K',
    likes: '1.2K',
    caption: 'A day in the life of a travel photographer #behindthescenes',
  },
  {
    id: '2',
    thumbnail: 'https://source.unsplash.com/random/400x600/?city=2',
    views: '8.7K',
    likes: '934',
    caption: 'Camera tips and tricks for beginners #photography101',
  },
  {
    id: '3',
    thumbnail: 'https://source.unsplash.com/random/400x600/?nature=2',
    views: '23.1K',
    likes: '3.4K',
    caption: 'Editing tutorial: How I achieve this cinematic look #editing',
  },
];

const Profile = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  return (
    <Layout>
      <div className="pb-6">
        <ProfileHeader profile={profileData} />
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-vibrant-pink" />
                Influencer Status
              </h3>
              
              <InfluencerRanking 
                rank="gold"
                progress={78}
                stats={{
                  followers: 12532,
                  engagement: 8.4,
                  reach: 38500,
                  collaborations: 15
                }}
              />
              
              <div className="mt-5 pt-5 border-t border-border">
                <h4 className="text-sm font-medium mb-3">Achievements</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-vibrant-pink/10 text-vibrant-pink border-vibrant-pink/30">Top Creator</Badge>
                  <Badge variant="outline" className="bg-vibrant-purple/10 text-vibrant-purple border-vibrant-purple/30">Trend Setter</Badge>
                  <Badge variant="outline" className="bg-vibrant-blue/10 text-vibrant-blue border-vibrant-blue/30">Photography Pro</Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold mb-4">About</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Link2 className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href={`https://${profileData.website}`} className="text-vibrant-pink hover:underline">{profileData.website}</a>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Joined January 2023</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="mb-6 justify-start w-full border-b rounded-none h-auto p-0 bg-transparent">
                <div className="flex items-center w-full overflow-x-auto">
                  <TabsTrigger 
                    value="posts" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-vibrant-pink data-[state=active]:bg-transparent h-10"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" /> Posts
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reels" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-vibrant-pink data-[state=active]:bg-transparent h-10"
                  >
                    <Play className="h-4 w-4 mr-2" /> Reels
                  </TabsTrigger>
                  <TabsTrigger 
                    value="saved" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-vibrant-pink data-[state=active]:bg-transparent h-10"
                  >
                    <Bookmark className="h-4 w-4 mr-2" /> Saved
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tagged" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-vibrant-pink data-[state=active]:bg-transparent h-10"
                  >
                    <Users className="h-4 w-4 mr-2" /> Tagged
                  </TabsTrigger>
                  
                  <div className="ml-auto flex items-center px-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-8 w-8 p-0 ${viewMode === 'grid' ? 'text-vibrant-pink' : 'text-muted-foreground'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-8 w-8 p-0 ${viewMode === 'list' ? 'text-vibrant-pink' : 'text-muted-foreground'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsList>
              
              <TabsContent value="posts" className="mt-0">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-3 gap-1 md:gap-2">
                    {userPosts.map((post) => (
                      <div key={post.id} className="aspect-square relative group overflow-hidden rounded-md">
                        <img 
                          src={post.image} 
                          alt={post.caption} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex items-center gap-4 text-white">
                            <div className="flex items-center">
                              <Heart className="h-5 w-5 mr-1" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-5 w-5 mr-1" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userPosts.map((post) => (
                      <div key={post.id} className="bg-background border border-border rounded-lg overflow-hidden">
                        <div className="p-3 border-b border-border">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full overflow-hidden">
                              <img src={profileData.avatar} alt={profileData.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{profileData.name}</div>
                              <div className="text-xs text-muted-foreground">{post.date}</div>
                            </div>
                            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <img src={post.image} alt={post.caption} className="w-full h-auto" />
                        </div>
                        
                        <div className="p-3">
                          <div className="flex items-center gap-2 mb-3">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="text-sm font-medium mb-1">{post.likes} likes</div>
                          <div className="text-sm mb-2">
                            <span className="font-medium mr-1">{profileData.username}</span>
                            {post.caption}
                          </div>
                          <div className="text-xs text-muted-foreground">View all {post.comments} comments</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reels" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                  {userReels.map((reel) => (
                    <div key={reel.id} className="relative aspect-[9/16] rounded-lg overflow-hidden group">
                      <img 
                        src={reel.thumbnail} 
                        alt={reel.caption} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                        <div className="text-sm line-clamp-2 mb-1">{reel.caption}</div>
                        <div className="flex items-center text-xs opacity-90 gap-3">
                          <div className="flex items-center gap-1">
                            <Play className="h-3 w-3" fill="currentColor" />
                            <span>{reel.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{reel.likes}</span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="mt-3 w-full bg-vibrant-pink hover:bg-vibrant-purple opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Play className="h-4 w-4 mr-1" fill="currentColor" /> Watch
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="saved" className="mt-0">
                <div className="flex flex-col items-center justify-center py-12 border border-dashed border-border rounded-lg text-center">
                  <BookMarked className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-2">Saved Posts</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    When you save posts, they'll appear here for you to see later.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="tagged" className="mt-0">
                <div className="flex flex-col items-center justify-center py-12 border border-dashed border-border rounded-lg text-center">
                  <Lock className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-2">Only visible to you</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Posts that you've been tagged in will appear here. You can manage who can tag you in your privacy settings.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
