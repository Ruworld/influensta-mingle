
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { FeedPost } from '@/components/feed/FeedPost';

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
};

const posts = [
  {
    id: '1',
    username: 'Alex Rivera',
    handle: 'alexrivera',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=2',
    content: 'Working from this beautiful cafe today. The ambiance is just perfect for creativity to flow. Anyone else love finding new workspaces? ☕️💻',
    image: 'https://source.unsplash.com/random/1200x800/?cafe',
    timestamp: '4 hours ago',
    likes: 287,
    dislikes: 14,
    comments: 32,
    shares: 5,
    liked: false,
    disliked: false,
  },
  {
    id: '2',
    username: 'Alex Rivera',
    handle: 'alexrivera',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=2',
    content: 'Just got these new photography accessories. Game changer for my workflow!',
    image: 'https://source.unsplash.com/random/1200x800/?camera',
    timestamp: '1 day ago',
    likes: 543,
    dislikes: 7,
    comments: 76,
    shares: 12,
    liked: true,
    disliked: false,
  },
  {
    id: '3',
    username: 'Alex Rivera',
    handle: 'alexrivera',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=2',
    content: 'Sunset vibes. No filter needed when nature provides this kind of beauty.',
    image: 'https://source.unsplash.com/random/1200x800/?sunset',
    timestamp: '3 days ago',
    likes: 824,
    dislikes: 5,
    comments: 92,
    shares: 45,
    liked: false,
    disliked: false,
  },
];

const Profile = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <ProfileHeader profile={profile} />
        
        <div className="max-w-xl mx-auto">
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
