
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageCircle, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const MobileNav = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Plus, label: 'Post', path: '/create', isMain: true },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border md:hidden z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md transition-all",
              item.isMain ? "relative" : ""
            )}
          >
            {item.isMain ? (
              <Button className="h-12 w-12 rounded-full bg-accent hover:bg-accent/90">
                <item.icon className="h-5 w-5" />
              </Button>
            ) : (
              <>
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
                    "text-xs",
                    location.pathname === item.path
                      ? "text-accent font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
