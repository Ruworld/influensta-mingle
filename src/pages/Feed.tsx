
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { FeedPost } from '@/components/feed/FeedPost';
import { CreatePostButton } from '@/components/ui/CreatePostButton';

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
  },
];

const Feed = () => {
  return (
    <Layout>
      <div className="max-w-xl mx-auto">
        <div className="mb-6 sticky top-20 z-10 bg-background/80 backdrop-blur-md pt-4 pb-2">
          <div className="glass-panel p-4">
            <CreatePostButton />
          </div>
        </div>
        
        <div>
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
