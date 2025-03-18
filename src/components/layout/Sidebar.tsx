
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
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const location = useLocation();
  
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
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: LogOut, label: 'Sign Out', path: '/sign-in' },
  ];
  
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[240px] border-r border-border bg-background/80 backdrop-blur-md overflow-y-auto py-6 px-3 hidden md:block">
      <div className="space-y-4">
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 px-3 font-normal text-muted-foreground hover:text-foreground",
                  location.pathname === item.path && "bg-indigo-50 text-indigo-600 font-medium dark:bg-indigo-900/10"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>
        
        <div className="px-3 py-2">
          <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700">
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
                    location.pathname === item.path && "bg-indigo-50 text-indigo-600 font-medium dark:bg-indigo-900/10"
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
