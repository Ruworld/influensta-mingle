
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
  Building
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
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Play, label: 'Reels', path: '/reels' },
    { icon: Film, label: 'Shorts', path: '/shorts' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  const secondaryItems = [
    { icon: Bookmark, label: 'Saved items', path: '/saved' },
    { icon: Users, label: 'Groups', path: '/groups' },
    { icon: Newspaper, label: 'Newsletters', path: '/newsletters' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: LogOut, label: 'Sign Out', path: '/sign-in' },
  ];
  
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[240px] border-r border-border bg-background/80 backdrop-blur-md overflow-y-auto py-6 px-3 hidden md:block">
      <div className="space-y-4">
        {/* Profile card */}
        <div className="rounded-lg border border-border p-4 mb-4">
          <Link to="/profile" className="flex flex-col items-center mb-3">
            <div className="w-full h-16 mb-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-t-lg relative -mt-4 -mx-4">
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
              <p className="font-semibold text-primary">{profileStats.profileViews}</p>
            </div>
            <div className="p-2 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">Post impressions</p>
              <p className="font-semibold text-primary">{profileStats.postImpressions}</p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs mb-2">Unlock exclusive tools & insights</p>
            <Button variant="default" size="sm" className="w-full justify-start gap-2 text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Try Premium
            </Button>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 px-3 font-normal text-muted-foreground hover:text-foreground",
                  location.pathname === item.path && "bg-primary/10 text-primary font-medium"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>
        
        <div className="px-3 py-2">
          <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
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
                    "w-full justify-start gap-3 px-3 font-normal text-muted-foreground hover:text-foreground",
                    location.pathname === item.path && "bg-primary/10 text-primary font-medium"
                  )}
                >
                  <item.icon className="h-5 w-5" />
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
