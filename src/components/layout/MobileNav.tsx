
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User, Plus, Play, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const MobileNav = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Play, label: 'Reels', path: '/reels', hasNotification: true },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border md:hidden z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md transition-all relative",
            )}
          >
            {item.hasNotification && (
              <span className="absolute -top-1 right-0 h-2 w-2 bg-accent rounded-full"></span>
            )}
            <item.icon
              className={cn(
                "h-6 w-6",
                location.pathname === item.path
                  ? "text-accent"
                  : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-[10px]",
                location.pathname === item.path
                  ? "text-accent font-medium"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
      
      {/* Floating post button */}
      <Link
        to="/create"
        className="absolute -top-14 right-6 h-14 w-14 rounded-full bg-gradient-to-tr from-accent to-purple-500 shadow-lg flex items-center justify-center"
      >
        <Plus className="h-7 w-7 text-white" />
      </Link>
    </div>
  );
};
