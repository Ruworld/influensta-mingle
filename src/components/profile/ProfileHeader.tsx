
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Share } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

interface ProfileHeaderProps {
  profile: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    coverImage: string;
    bio: string;
    postsCount: number;
    followersCount: number;
    followingCount: number;
    isFollowing?: boolean;
    isVerified?: boolean;
  };
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing || false);
  const [followersCount, setFollowersCount] = useState(profile.followersCount);
  
  const handleFollow = () => {
    if (isFollowing) {
      setFollowersCount(followersCount - 1);
      setIsFollowing(false);
    } else {
      setFollowersCount(followersCount + 1);
      setIsFollowing(true);
    }
  };
  
  return (
    <div className="pb-4 animate-fade-in">
      <div className="relative mb-16">
        <div className="h-48 md:h-64 w-full overflow-hidden rounded-b-lg">
          <img 
            src={profile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 flex flex-col items-center">
          <Avatar className="h-32 w-32 border-4 border-background">
            <img src={profile.avatar} alt={profile.displayName} className="h-full w-full object-cover" />
          </Avatar>
          
          {profile.isVerified && (
            <div className="absolute bottom-0 right-0 bg-accent text-white p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{profile.displayName}</h1>
        <p className="text-muted-foreground mb-3">@{profile.username}</p>
        
        <p className="text-sm max-w-md mx-auto mb-4">{profile.bio}</p>
        
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="text-center">
            <p className="font-semibold">{profile.postsCount}</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
          
          <div className="text-center">
            <p className="font-semibold">{followersCount}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          
          <div className="text-center">
            <p className="font-semibold">{profile.followingCount}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-3">
          <Button 
            variant={isFollowing ? "outline" : "default"}
            className={isFollowing ? "" : "bg-accent hover:bg-accent/90"}
            onClick={handleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
          
          <Button variant="outline" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
