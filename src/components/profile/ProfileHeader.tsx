
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Share, BadgeCheck, Bell, BellOff, Users, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [isNotifying, setIsNotifying] = useState(false);
  const [followersCount, setFollowersCount] = useState(profile.followersCount);
  
  const handleFollow = () => {
    if (isFollowing) {
      setFollowersCount(followersCount - 1);
      setIsFollowing(false);
      setIsNotifying(false);
      toast.info(`Unfollowed @${profile.username}`);
    } else {
      setFollowersCount(followersCount + 1);
      setIsFollowing(true);
      toast.success(`Following @${profile.username}`, {
        description: "You'll see their posts in your feed now.",
        action: {
          label: "Undo",
          onClick: () => handleFollow(),
        },
      });
      
      // Show FOMO toast
      setTimeout(() => {
        toast(`${Math.floor(Math.random() * 50) + 10} people followed ${profile.displayName} in the last hour!`, {
          icon: <Users className="h-5 w-5" />,
        });
      }, 2000);
    }
  };
  
  const handleNotificationToggle = () => {
    setIsNotifying(!isNotifying);
    toast.success(isNotifying 
      ? `Post notifications turned off for @${profile.username}` 
      : `You'll be notified when @${profile.username} posts!`
    );
  };
  
  const handleShare = () => {
    toast.success("Profile link copied to clipboard!");
    navigator.clipboard.writeText(`https://influensta.app/${profile.username}`);
  };
  
  return (
    <div className="pb-4 animate-fade-in">
      <div className="relative mb-16">
        <div className="h-48 md:h-64 w-full overflow-hidden rounded-b-lg">
          <img 
            src={profile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover hover-scale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 flex flex-col items-center">
          <Avatar className="h-32 w-32 border-4 border-background ring-4 ring-accent/20">
            <img src={profile.avatar} alt={profile.displayName} className="h-full w-full object-cover" />
          </Avatar>
          
          {profile.isVerified && (
            <div className="absolute bottom-0 right-0 bg-accent text-white p-1 rounded-full border-2 border-background">
              <BadgeCheck className="h-5 w-5 fill-white" />
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-1">
          {profile.displayName}
          {profile.isVerified && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <BadgeCheck className="h-5 w-5 text-accent inline" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified Account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </h1>
        <p className="text-muted-foreground mb-3">@{profile.username}</p>
        
        <p className="text-sm max-w-md mx-auto mb-4">{profile.bio}</p>
        
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <p className="font-semibold">{profile.postsCount}</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
          
          <div className="text-center">
            <p className="font-semibold">{followersCount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          
          <div className="text-center">
            <p className="font-semibold">{profile.followingCount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <Button 
            variant={isFollowing ? "outline" : "default"}
            className={cn(
              "px-5",
              isFollowing ? "" : "bg-accent hover:bg-accent/90"
            )}
            onClick={handleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
          
          {isFollowing && (
            <Button 
              variant="outline" 
              size="icon"
              className={isNotifying ? "text-accent" : ""}
              onClick={handleNotificationToggle}
            >
              {isNotifying ? (
                <Bell className="h-5 w-5 fill-accent" />
              ) : (
                <BellOff className="h-5 w-5" />
              )}
            </Button>
          )}
          
          <Button variant="outline" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
          
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
