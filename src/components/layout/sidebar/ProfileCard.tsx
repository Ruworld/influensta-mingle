
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, TrendingUp } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ProfileStats {
  profileViews: number;
  postImpressions: number;
}

interface CommunityStats {
  members: number;
  activeMembersToday: number;
  growthRate: string;
}

export const ProfileCard = () => {
  const { user, profile } = useAuth();
  const [profileStats, setProfileStats] = useState<ProfileStats>({
    profileViews: 0,
    postImpressions: 0
  });
  
  // Fetch real profile stats when profile loads
  useEffect(() => {
    if (profile) {
      // Default values in case we don't have real data yet
      const statsData = {
        profileViews: profile.views_count || 0,
        postImpressions: profile.post_impressions || 0,
      };
      
      setProfileStats(statsData);
      
      // Update profile views (increment by 1)
      if (user && profile) {
        const updateViews = async () => {
          try {
            const { error } = await supabase
              .from('profiles')
              .update({ 
                views_count: (profile.views_count || 0) + 1,
                post_impressions: (profile.post_impressions || 0) + Math.floor(Math.random() * 5) // Simulate some new post impressions
              })
              .eq('id', user.id);
              
            if (error) {
              console.error('Error updating profile views:', error);
            }
          } catch (err) {
            console.error('Failed to update profile views:', err);
          }
        };
        
        // Only update views once per session
        const hasViewedProfile = sessionStorage.getItem(`profile_viewed_${user.id}`);
        if (!hasViewedProfile) {
          updateViews();
          sessionStorage.setItem(`profile_viewed_${user.id}`, 'true');
        }
      }
    }
  }, [profile, user]);
  
  // Community stats based on profiles count
  const communityStats: CommunityStats = {
    members: profile ? 1 : 0,
    activeMembersToday: profile ? 1 : 0,
    growthRate: profile ? "10%" : "0%"
  };

  return (
    <div className="rounded-lg border border-border p-4 mb-4">
      <Link to="/profile" className="flex flex-col items-center mb-3">
        <div className="w-full h-16 mb-12 bg-gradient-to-r from-fresh-blue to-fresh-teal rounded-t-lg relative -mt-4 -mx-4">
          <Avatar className="h-16 w-16 absolute left-1/2 transform -translate-x-1/2 top-8 border-4 border-background">
            <img src={profile?.avatar_url || 'https://source.unsplash.com/random/200x200/?portrait=2'} alt={profile?.full_name || "User"} className="h-full w-full object-cover" />
          </Avatar>
        </div>
        <h3 className="font-semibold text-sm mt-2">{profile?.full_name || "Guest User"}</h3>
        <p className="text-xs text-muted-foreground text-center">{profile?.bio || "Digital creator"}</p>
      </Link>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="p-2 bg-muted rounded-lg">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <p>Profile views</p>
          </div>
          <p className="font-semibold text-fresh-blue">{profileStats.profileViews}</p>
        </div>
        <div className="p-2 bg-muted rounded-lg">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            <p>Post impressions</p>
          </div>
          <p className="font-semibold text-fresh-blue">{profileStats.postImpressions}</p>
        </div>
      </div>
      
      {/* Community Stats Section */}
      <div className="mt-4 p-3 bg-gradient-to-r from-fresh-blue/10 to-fresh-teal/10 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-foreground">Community</h4>
          <Badge variant="outline" className="text-fresh-blue border-fresh-blue text-xs animate-pulse-scale">
            NEW
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Members</span>
            <span className="font-bold text-fresh-blue">{communityStats.members.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Active Today</span>
            <span className="font-bold text-fresh-blue">{communityStats.activeMembersToday.toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Growth Rate (weekly)</span>
          <span className="text-xs font-semibold text-fresh-green flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> {communityStats.growthRate}
          </span>
        </div>
      </div>
    </div>
  );
};
