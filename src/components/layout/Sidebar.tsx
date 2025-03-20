
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  MessageCircle, 
  Bell, 
  User, 
  Plus, 
  Settings,
  Play,
  Film,
  Sparkles,
  LogOut,
  Bookmark,
  Users,
  Newspaper,
  Calendar,
  Building,
  ShoppingBag,
  Zap,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const Sidebar = () => {
  const location = useLocation();
  
  // Profile stats for the sidebar
  const profileStats = {
    profileViews: 63,
    postImpressions: 32,
    name: "Alex Rivera",
    title: "Digital creator | Photography",
    location: "San Francisco, California",
    company: "Influensta",
    avatar: 'https://source.unsplash.com/random/200x200/?portrait=2'
  };
  
  // Community stats
  const communityStats = {
    members: 12438,
    activeMembersToday: 5293,
    growthRate: "18%"
  };
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Play, label: 'Reels', path: '/reels' },
    { icon: Film, label: 'Shorts', path: '/shorts' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: ShoppingBag, label: 'Merchandise', path: '/merchandise' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  const secondaryItems = [
    { icon: Bookmark, label: 'Saved items', path: '/saved' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Zap, label: 'Boost Content', path: '/boost' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: LogOut, label: 'Sign Out', path: '/sign-in' },
  ];
  
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[240px] border-r border-border bg-background/80 backdrop-blur-md overflow-y-auto py-6 px-3 hidden md:block">
      <div className="space-y-4">
        {/* Profile card */}
        <div className="rounded-lg border border-border p-4 mb-4">
          <Link to="/profile" className="flex flex-col items-center mb-3">
            <div className="w-full h-16 mb-12 bg-gradient-to-r from-vibrant-pink to-vibrant-purple rounded-t-lg relative -mt-4 -mx-4">
              <Avatar className="h-16 w-16 absolute left-1/2 transform -translate-x-1/2 top-8 border-4 border-background">
                <img src={profileStats.avatar} alt={profileStats.name} className="h-full w-full object-cover" />
              </Avatar>
            </div>
            <h3 className="font-semibold text-sm mt-2">{profileStats.name}</h3>
            <p className="text-xs text-muted-foreground text-center">{profileStats.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{profileStats.location}</p>
          </Link>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="p-2 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">Profile viewers</p>
              <p className="font-semibold text-vibrant-pink">{profileStats.profileViews}</p>
            </div>
            <div className="p-2 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">Post impressions</p>
              <p className="font-semibold text-vibrant-pink">{profileStats.postImpressions}</p>
            </div>
          </div>
          
          {/* Community Stats Section - Replacing Premium */}
          <div className="mt-4 p-3 bg-gradient-to-r from-vibrant-pink/10 to-vibrant-purple/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-foreground">Community</h4>
              <Badge variant="outline" className="text-vibrant-pink border-vibrant-pink text-xs animate-pulse-scale">
                LIVE
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Members</span>
                <span className="font-bold text-vibrant-pink">{communityStats.members.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Active Today</span>
                <span className="font-bold text-vibrant-pink">{communityStats.activeMembersToday.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Growth Rate (weekly)</span>
              <span className="text-xs font-semibold text-vibrant-green flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> {communityStats.growthRate}
              </span>
            </div>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 px-3 font-normal text-muted-foreground hover:text-foreground hover:bg-vibrant-purple/5",
                  location.pathname === item.path && "bg-gradient-to-r from-vibrant-pink/20 to-vibrant-purple/20 text-vibrant-pink font-medium"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  location.pathname === item.path && "text-vibrant-pink"
                )} />
                <span>{item.label}</span>
                {item.label === 'Community' && (
                  <Badge className="ml-auto bg-vibrant-pink text-white text-[10px] px-1.5">
                    {(communityStats.activeMembersToday).toLocaleString()}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </nav>
        
        <div className="px-3 py-2">
          <Button className="w-full gap-2 bg-gradient-to-r from-vibrant-pink to-vibrant-purple hover:opacity-90 animate-pulse-scale">
            <Plus className="h-5 w-5" />
            <span>New Post</span>
          </Button>
        </div>
        
        <div className="pt-4 border-t border-border">
          <nav className="flex flex-col gap-1">
            {secondaryItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 px-3 font-normal text-muted-foreground hover:text-foreground hover:bg-vibrant-purple/5",
                    location.pathname === item.path && "bg-gradient-to-r from-vibrant-pink/20 to-vibrant-purple/20 text-vibrant-pink font-medium",
                    item.label === 'Boost Content' && "text-vibrant-yellow font-medium"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5",
                    location.pathname === item.path && "text-vibrant-pink",
                    item.label === 'Boost Content' && "text-vibrant-yellow"
                  )} />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};
