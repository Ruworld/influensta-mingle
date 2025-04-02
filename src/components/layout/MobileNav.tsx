
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User, Plus, Play, MessageCircle, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const MobileNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Bell, label: 'Notifications', path: '/notifications', hasNotification: true },
    { icon: MessageCircle, label: 'Messages', path: '/messages', hasNotification: true },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-md transition-all relative",
            )}
          >
            {item.hasNotification && (
              <span className="absolute -top-1 right-0 h-2 w-2 bg-accent rounded-full"></span>
            )}
            <item.icon
              className={cn(
                "h-5 w-5",
                location.pathname === item.path
                  ? "text-fresh-blue"
                  : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-[10px]",
                location.pathname === item.path
                  ? "text-fresh-blue font-medium"
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
        className="absolute -top-12 right-4 h-12 w-12 rounded-full bg-gradient-to-tr from-fresh-blue to-fresh-teal shadow-lg flex items-center justify-center touch-manipulation"
      >
        <Plus className="h-6 w-6 text-white" />
      </Link>
    </div>
  );
};
