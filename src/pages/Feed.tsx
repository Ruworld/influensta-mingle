
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { FeedPost } from '@/components/feed/FeedPost';
import { CreatePostButton } from '@/components/ui/CreatePostButton';
import { StoryCircle } from '@/components/stories/StoryCircle';
import { TrendingTopics } from '@/components/feed/TrendingTopics';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';

// Example data
const posts = [
  {
    id: '1',
    username: 'Sarah Johnson',
    handle: 'sarahjohnson',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=1',
    content: "Just wrapped up an amazing photoshoot for a new collaboration. Can't wait to share the results with you all! 📸✨",
    image: 'https://source.unsplash.com/random/1200x800/?photoshoot',
    timestamp: '2 hours ago',
    likes: 423,
    dislikes: 15,
    comments: 47,
    shares: 12,
    liked: false,
    disliked: false,
    isVerified: true,
    isTrending: true,
  },
  {
    id: '2',
    username: 'Alex Rivera',
    handle: 'alexrivera',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=2',
    content: "Working from this beautiful cafe today. The ambiance is just perfect for creativity to flow. Anyone else love finding new workspaces? ☕️💻",
    image: 'https://source.unsplash.com/random/1200x800/?cafe',
    timestamp: '4 hours ago',
    likes: 287,
    dislikes: 8,
    comments: 32,
    shares: 5,
    liked: true,
    disliked: false,
  },
  {
    id: '3',
    username: 'Michelle Lee',
    handle: 'michellelee',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=3',
    content: 'Just launched my new website! Check it out and let me know what you think. Link in bio.',
    timestamp: '6 hours ago',
    likes: 567,
    dislikes: 21,
    comments: 84,
    shares: 23,
    liked: false,
    disliked: false,
    video: {
      url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-happily-in-a-field-of-tall-grass-4702-large.mp4',
      type: 'reel' as const
    },
    isTrending: true,
  },
  {
    id: '4',
    username: 'David Chen',
    handle: 'davidchen',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=4',
    content: 'The key to staying relevant in this industry is constant innovation. Always be learning, always be growing.',
    timestamp: 'Yesterday',
    likes: 832,
    dislikes: 12,
    comments: 65,
    shares: 41,
    liked: false,
    disliked: false,
    isVerified: true,
  },
];

// Stories data
const stories = [
  {
    id: '1',
    username: 'sarahjohnson',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=1',
    hasNewStory: true,
    isVerified: true,
  },
  {
    id: '2',
    username: 'alexrivera',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=2',
    hasNewStory: true,
  },
  {
    id: '3',
    username: 'michellelee',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=3',
    hasNewStory: true,
    isVerified: true,
  },
  {
    id: '4',
    username: 'davidchen',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=4',
    hasNewStory: false,
  },
  {
    id: '5',
    username: 'jessicapark',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=5',
    hasNewStory: true,
  },
  {
    id: '6',
    username: 'michaelwang',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=6',
    hasNewStory: true,
  },
  {
    id: '7',
    username: 'emmawhite',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=7',
    hasNewStory: false,
  },
];

// Trending topics
const trendingTopics = [
  { id: '1', name: 'Photography', postCount: 12500 },
  { id: '2', name: 'Travel', postCount: 8300 },
  { id: '3', name: 'Fashion', postCount: 7200 },
  { id: '4', name: 'Fitness', postCount: 5100 },
];

const Feed = () => {
  const [activeTab, setActiveTab] = useState("for-you");

  return (
    <Layout>
      <div className="max-w-xl mx-auto pb-20">
        {/* Stories Row */}
        <div className="mb-4 overflow-x-auto no-scrollbar sticky top-16 pt-3 z-10 bg-background/80 backdrop-blur-md">
          <div className="flex gap-4 pl-4 pr-8 py-2">
            {stories.map((story) => (
              <StoryCircle key={story.id} story={story} />
            ))}
          </div>
          
          {/* Tabs */}
          <div className="px-1 pt-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="for-you" className="gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>For You</span>
                </TabsTrigger>
                <TabsTrigger value="trending" className="gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Trending</span>
                </TabsTrigger>
                <TabsTrigger value="following" className="gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Following</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Create Post Button */}
        <div className="mb-6 px-4">
          <div className="glass-panel p-4">
            <CreatePostButton />
          </div>
        </div>
        
        {/* Trending topics - only show on Trending tab */}
        {activeTab === 'trending' && (
          <div className="mb-6 px-4">
            <TrendingTopics topics={trendingTopics} />
          </div>
        )}
        
        {/* FOMO Banner */}
        <div className="mb-6 mx-4">
          <div className="bg-gradient-to-r from-accent to-purple-500 text-white p-4 rounded-lg shadow-lg animate-pulse">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <p className="text-sm font-medium">214 people posted in the last hour. Don't miss out!</p>
            </div>
          </div>
        </div>
        
        {/* Posts Feed */}
        <div className="px-4 space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="relative">
              {post.isTrending && (
                <Badge className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-orange-400 to-pink-500 animate-pulse">
                  <TrendingUp className="h-3 w-3 mr-1" /> Trending
                </Badge>
              )}
              <FeedPost post={post} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
