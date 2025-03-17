
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

// Example data
const trendingPosts = [
  {
    id: '1',
    image: 'https://source.unsplash.com/random/600x600/?fashion',
    likes: 4532,
    comments: 287,
  },
  {
    id: '2',
    image: 'https://source.unsplash.com/random/600x600/?travel',
    likes: 3201,
    comments: 154,
  },
  {
    id: '3',
    image: 'https://source.unsplash.com/random/600x600/?food',
    likes: 6789,
    comments: 421,
  },
  {
    id: '4',
    image: 'https://source.unsplash.com/random/600x600/?technology',
    likes: 2983,
    comments: 176,
  },
  {
    id: '5',
    image: 'https://source.unsplash.com/random/600x600/?nature',
    likes: 5874,
    comments: 302,
  },
  {
    id: '6',
    image: 'https://source.unsplash.com/random/600x600/?art',
    likes: 3452,
    comments: 198,
  },
];

const suggestedUsers = [
  {
    id: '1',
    name: 'Emily Carter',
    username: 'emilycarter',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=6',
    bio: 'Travel photographer | Capture the world',
    followers: 23500,
    isVerified: true,
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    username: 'michaelrodriguez',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=7',
    bio: 'Fitness enthusiast | Motivational speaker',
    followers: 45700,
    isVerified: true,
  },
  {
    id: '3',
    name: 'Jessica Wong',
    username: 'jessicawong',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=8',
    bio: 'Fashion designer | Creative director',
    followers: 31200,
    isVerified: false,
  },
];

const trendingTopics = [
  {
    id: '1',
    name: '#InfluencerLife',
    postCount: 34500,
  },
  {
    id: '2',
    name: '#ContentCreation',
    postCount: 28700,
  },
  {
    id: '3',
    name: '#DigitalMarketing',
    postCount: 19300,
  },
  {
    id: '4',
    name: '#SocialMediaTips',
    postCount: 12500,
  },
  {
    id: '5',
    name: '#CreatorEconomy',
    postCount: 9800,
  },
];

const Explore = () => {
  const [following, setFollowing] = useState<string[]>([]);
  
  const handleFollow = (id: string) => {
    if (following.includes(id)) {
      setFollowing(following.filter(userId => userId !== id));
    } else {
      setFollowing([...following, id]);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto pb-8">
        <div className="mb-6">
          <div className="relative mx-auto max-w-2xl mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search creators, topics, or content..." 
              className="pl-10 py-6 text-base"
            />
          </div>
          
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="creators">Creators</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trending" className="animate-fade-in mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {trendingPosts.map((post) => (
                  <div key={post.id} className="aspect-square relative overflow-hidden rounded-xl group hover-scale">
                    <img 
                      src={post.image} 
                      alt="Trending post" 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <div className="text-white text-sm flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                          </svg>
                          {post.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                          </svg>
                          {post.comments.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="creators" className="animate-fade-in mt-0">
              <div className="space-y-4">
                {suggestedUsers.map((user) => (
                  <div key={user.id} className="glass-panel p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        size="lg"
                      />
                      
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-medium">{user.name}</h3>
                          {user.isVerified && (
                            <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                        <p className="text-sm mt-1">{user.bio}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {user.followers.toLocaleString()} followers
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant={following.includes(user.id) ? "outline" : "default"}
                      className={following.includes(user.id) ? "" : "bg-accent hover:bg-accent/90"}
                      onClick={() => handleFollow(user.id)}
                    >
                      {following.includes(user.id) ? "Following" : "Follow"}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="topics" className="animate-fade-in mt-0">
              <div className="space-y-4">
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="glass-panel p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{topic.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {topic.postCount.toLocaleString()} posts
                      </p>
                    </div>
                    
                    <Button className="bg-accent hover:bg-accent/90">
                      Explore
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
