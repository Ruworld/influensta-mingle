import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { FeedPost } from '@/components/feed/FeedPost';
import { StoryCircle } from '@/components/stories/StoryCircle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InfluencerRating } from '@/components/profile/InfluencerRating';
import { InfluencerRanking, RankLevel } from '@/components/profile/InfluencerRanking';
import { Badge } from '@/components/ui/badge';
import { Award, Grid, Bookmark, Image, PlayCircle, Star } from 'lucide-react';

// Example data
const profile = {
  id: '1',
  username: 'alexrivera',
  displayName: 'Alex Rivera',
  avatar: 'https://source.unsplash.com/random/200x200/?portrait=2',
  coverImage: 'https://source.unsplash.com/random/1200x400/?landscape',
  bio: 'Digital creator | Photography enthusiast | Always exploring | Collab: alex@email.com',
  postsCount: 124,
  followersCount: 12300,
  followingCount: 546,
  isVerified: true,
  influencerScore: 4.7,
  influencerCategory: 'Photography',
  influencerRank: 'gold' as RankLevel,
  influencerProgress: 78,
  influencerStats: {
    followers: 12300,
    engagement: 4.8,
    reach: 45200,
    collaborations: 23
  },
  badgeLevel: 'Gold',
  endorsements: 523,
  achievements: [
    { id: '1', title: 'Trending Creator', icon: 'trophy' },
    { id: '2', title: 'Top 10% Engagement', icon: 'zap' },
    { id: '3', title: 'Rising Star', icon: 'star' },
  ],
  stories: [
    { id: '1', thumbnail: 'https://source.unsplash.com/random/300x300/?city' },
    { id: '2', thumbnail: 'https://source.unsplash.com/random/300x300/?nature' },
    { id: '3', thumbnail: 'https://source.unsplash.com/random/300x300/?food' },
    { id: '4', thumbnail: 'https://source.unsplash.com/random/300x300/?travel' },
  ]
};

// Image gallery
const photoGallery = [
  'https://source.unsplash.com/random/600x600/?photography=1',
  'https://source.unsplash.com/random/600x600/?photography=2',
  'https://source.unsplash.com/random/600x600/?photography=3',
  'https://source.unsplash.com/random/600x600/?photography=4',
  'https://source.unsplash.com/random/600x600/?photography=5',
  'https://source.unsplash.com/random/600x600/?photography=6',
  'https://source.unsplash.com/random/600x600/?photography=7',
  'https://source.unsplash.com/random/600x600/?photography=8',
  'https://source.unsplash.com/random/600x600/?photography=9',
];

// Reels data
const reels = [
  {
    id: '1',
    thumbnail: 'https://source.unsplash.com/random/400x600/?portrait=1',
    views: '12.5K',
  },
  {
    id: '2',
    thumbnail: 'https://source.unsplash.com/random/400x600/?travel=1',
    views: '28.3K',
  },
  {
    id: '3',
    thumbnail: 'https://source.unsplash.com/random/400x600/?food=1',
    views: '9.7K',
  },
  {
    id: '4',
    thumbnail: 'https://source.unsplash.com/random/400x600/?fashion=1',
    views: '45.2K',
  },
  {
    id: '5',
    thumbnail: 'https://source.unsplash.com/random/400x600/?sport=1',
    views: '33.1K',
  },
  {
    id: '6',
    thumbnail: 'https://source.unsplash.com/random/400x600/?dance=1',
    views: '17.8K',
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  
  // We simulate having our own stories plus those from others
  const allStories = [
    {
      id: 'create',
      username: 'yourname',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait=5',
      hasNewStory: false,
      isCurrentUser: true,
    },
    ...profile.stories.map((story, index) => ({
      id: story.id,
      username: `Story ${index + 1}`,
      avatar: story.thumbnail,
      hasNewStory: true,
    })),
  ];
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <ProfileHeader profile={profile} />
        
        {/* Stories */}
        <div className="mb-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 px-4 py-2">
            {allStories.map((story) => (
              <StoryCircle
                key={story.id}
                story={story as any}
                isCurrentUser={'isCurrentUser' in story ? story.isCurrentUser : false}
              />
            ))}
          </div>
        </div>
        
        {/* Influencer Ranking with new component */}
        <div className="px-4 mb-6">
          <InfluencerRanking 
            rank={profile.influencerRank}
            progress={profile.influencerProgress}
            stats={profile.influencerStats}
          />
        </div>
        
        {/* Legacy Influencer Rating - can keep this or remove it, but keeping for now */}
        <div className="px-4 mb-6">
          <InfluencerRating profile={profile} />
        </div>
        
        {/* Content Tabs */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 h-auto p-1 mb-4">
              <TabsTrigger value="posts" className="flex items-center gap-1.5 py-2">
                <Grid className="h-4 w-4" />
                <span>Posts</span>
              </TabsTrigger>
              <TabsTrigger value="photos" className="flex items-center gap-1.5 py-2">
                <Image className="h-4 w-4" />
                <span>Photos</span>
              </TabsTrigger>
              <TabsTrigger value="reels" className="flex items-center gap-1.5 py-2">
                <PlayCircle className="h-4 w-4" />
                <span>Reels</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-1.5 py-2">
                <Bookmark className="h-4 w-4" />
                <span>Saved</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="px-4">
              <div className="max-w-xl mx-auto">
                {posts.map((post) => (
                  <FeedPost key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="photos">
              <div className="grid grid-cols-3 gap-1 px-1">
                {photoGallery.map((photo, index) => (
                  <div key={index} className="aspect-square overflow-hidden">
                    <img 
                      src={photo} 
                      alt={`Gallery item ${index}`} 
                      className="w-full h-full object-cover hover-scale"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reels">
              <div className="grid grid-cols-3 gap-1 px-1">
                {reels.map((reel) => (
                  <div key={reel.id} className="aspect-[9/16] relative overflow-hidden">
                    <img 
                      src={reel.thumbnail} 
                      alt={`Reel ${reel.id}`} 
                      className="w-full h-full object-cover hover-scale"
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs bg-black/50 px-1.5 py-0.5 rounded-full">
                      <PlayCircle className="h-3 w-3" />
                      {reel.views}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="saved">
              <div className="p-4 text-center">
                <div className="p-6 border border-dashed border-muted-foreground/40 rounded-lg">
                  <Bookmark className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No saved posts yet</h3>
                  <p className="text-muted-foreground text-sm">
                    When you save posts, they'll appear here.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
