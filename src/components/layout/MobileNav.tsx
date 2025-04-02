
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Bell, MessageCircle, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '@/components/shared/Avatar';

export const MobileNav = () => {
  const location = useLocation();
  const { user, profile } = useAuth();
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/explore' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 pb-safe">
      <div className="flex items-center justify-around h-14 w-full">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center gap-1 p-1 transition-all",
              location.pathname === item.path ? "text-fresh-blue" : "text-muted-foreground"
            )}
            aria-label={item.label}
          >
            <item.icon
              className={cn(
                "h-6 w-6",
                location.pathname === item.path
                  ? "text-fresh-blue"
                  : "text-muted-foreground"
              )}
            />
          </Link>
        ))}
        
        <Link to="/profile" className="flex flex-col items-center justify-center p-1 transition-all">
          <Avatar 
            src={profile?.avatar_url || ""} 
            alt={profile?.full_name || "User"} 
            size="sm"
            className={cn(
              "border-2",
              location.pathname === "/profile"
                ? "border-fresh-blue"
                : "border-transparent"
            )}
          />
        </Link>
      </div>
      
      {/* Floating create button */}
      <Link
        to="/create"
        className="absolute -top-14 right-4 h-12 w-12 rounded-full bg-gradient-to-tr from-fresh-blue to-fresh-teal shadow-lg flex items-center justify-center touch-manipulation"
        aria-label="Create new post"
      >
        <Plus className="h-6 w-6 text-white" />
      </Link>
    </div>
  );
};
