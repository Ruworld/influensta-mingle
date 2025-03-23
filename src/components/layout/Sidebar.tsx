
import React from 'react';
import { ProfileCard } from './sidebar/ProfileCard';
import { NavigationMenu } from './sidebar/NavigationMenu';
import { SecondaryMenu } from './sidebar/SecondaryMenu';
import { CreatePostButton } from './sidebar/CreatePostButton';
import { useAuth } from '@/contexts/AuthContext';

export const Sidebar = () => {
  const { profile } = useAuth();
  
  // Community stats based on profiles count
  const communityStats = {
    members: profile ? 1 : 0,
    activeMembersToday: profile ? 1 : 0,
    growthRate: profile ? "10%" : "0%"
  };
  
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[240px] border-r border-border bg-background/80 backdrop-blur-md overflow-y-auto py-6 px-3 hidden md:block">
      <div className="space-y-4">
        <ProfileCard />
        <NavigationMenu communityStats={communityStats} />
        <CreatePostButton />
        <SecondaryMenu />
      </div>
    </aside>
  );
};
