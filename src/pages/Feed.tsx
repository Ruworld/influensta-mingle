import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { FeedPost } from '@/components/feed/FeedPost';
import { CreatePostButton } from '@/components/ui/CreatePostButton';
import { StoryCircle } from '@/components/stories/StoryCircle';
import { TrendingTopics } from '@/components/feed/TrendingTopics';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

const stories = [
  {
    id: '1',
    username: 'sarahjohnson',
    avatar: '/public/lovable-uploads/6ab16f59-8543-4487-a552-aad94d0390a3.png',
    hasNewStory: true,
    isVerified: true,
  },
  {
    id: '2',
    username: 'alexrivera',
    avatar: '/public/lovable-uploads/6ab16f59-8543-4487-a552-aad94d0390a3.png',
    hasNewStory: true,
  },
  {
    id: '3',
    username: 'michellelee',
    avatar: '/public/lovable-uploads/6ab16f59-8543-4487-a552-aad94d0390a3.png',
    hasNewStory: true,
    isVerified: true,
  },
  {
    id: '4',
    username: 'davidchen',
    avatar: '/public/lovable-uploads/6ab16f59-8543-4487-a552-aad94d0390a3.png',
    hasNewStory: false,
  },
  {
    id: '5',
    username: 'jessicapark',
    avatar: '/public/lovable-uploads/6ab16f59-8543-4487-a552-aad94d0390a3.png',
    hasNewStory: true,
  },
  {
    id: '6',
    username: 'michaelwang',
    avatar: '/public/lovable-uploads/6ab16f59-8543-4487-a552-aad94d0390a3.png',
    hasNewStory: true,
  },
  {
    id: '7',
    username: 'emmawhite',
    avatar: '/public/lovable-uploads/6ab16f59-8543-4487-a552-aad94d0390a3.png',
    hasNewStory: false,
  },
];

const trendingTopics = [
  { id: '1', name: 'Photography', postCount: 12500 },
  { id: '2', name: 'Travel', postCount: 8300 },
  { id: '3', name: 'Fashion', postCount: 7200 },
  { id: '4', name: 'Fitness', postCount: 5100 },
];

const Feed = () => {
  const [activeTab, setActiveTab] = useState("for-you");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchPosts();
  }, [activeTab, user]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (username, full_name, avatar_url, is_verified)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        const transformedPosts = await Promise.all(data.map(async (post) => {
          let isLiked = false;
          let likeCount = 0;
          
          if (user) {
            const { data: likesData } = await supabase
              .from('likes')
              .select('id')
              .eq('post_id', post.id)
              .eq('user_id', user.id);
              
            isLiked = !!likesData && likesData.length > 0;
          }
          
          const { count } = await supabase
            .from('likes')
            .select('id', { count: 'exact' })
            .eq('post_id', post.id);
            
          likeCount = count || 0;
          
          const { count: commentCount } = await supabase
            .from('comments')
            .select('id', { count: 'exact' })
            .eq('post_id', post.id);
          
          return {
            id: post.id,
            username: post.profiles?.full_name || 'Anonymous',
            handle: post.profiles?.username || 'user',
            avatar: post.profiles?.avatar_url || 'https://source.unsplash.com/random/100x100/?portrait=1',
            content: post.content || '',
            image: post.image_url || undefined,
            video: post.video_url ? {
              url: post.video_url,
              type: post.video_type || 'fullVideo'
            } : undefined,
            timestamp: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }),
            likes: likeCount,
            comments: commentCount || 0,
            shares: Math.floor(Math.random() * 20),
            liked: isLiked,
            disliked: false,
            isVerified: post.profiles?.is_verified || false,
            isTrending: likeCount > 100
          };
        }));
        
        setPosts(transformedPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-xl mx-auto pb-20 ${isMobile ? 'px-0' : ''}`}>
      <div className="mb-4 overflow-x-auto no-scrollbar sticky top-16 pt-3 z-10 bg-background/80 backdrop-blur-md">
        <div className="flex gap-2 px-2 py-2">
          {stories.map((story) => (
            <StoryCircle key={story.id} story={story} />
          ))}
        </div>
        
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

      <div className="mb-6 px-4">
        <div className="glass-panel p-4">
          <CreatePostButton />
        </div>
      </div>
      
      {activeTab === 'trending' && (
        <div className="mb-6 px-4">
          <TrendingTopics topics={trendingTopics} />
        </div>
      )}
      
      <div className="mb-6 mx-4">
        <div className="bg-gradient-to-r from-accent to-purple-500 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <p className="text-sm font-medium">214 people posted in the last hour. Don't miss out!</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="glass-panel p-4 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded"></div>
                  <div className="h-3 w-16 bg-muted rounded"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-4/5 bg-muted rounded"></div>
              </div>
              <div className="h-64 w-full bg-muted rounded"></div>
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="relative">
              {post.isTrending && (
                <Badge className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-orange-400 to-pink-500 animate-pulse">
                  <TrendingUp className="h-3 w-3 mr-1" /> Trending
                </Badge>
              )}
              <FeedPost post={post} />
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No posts to display</p>
            <p className="text-sm">Be the first to create a post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
