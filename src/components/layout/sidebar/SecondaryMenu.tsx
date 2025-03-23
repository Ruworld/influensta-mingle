
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Store, 
  Bookmark, 
  Calendar, 
  Zap, 
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

export const SecondaryMenu = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const secondaryItems: MenuItem[] = [
    { icon: Store, label: 'My Store', path: '/my-store' },
    { icon: Bookmark, label: 'Saved items', path: '/saved' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Zap, label: 'Boost Content', path: '/boost' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="pt-4 border-t border-border">
      <nav className="flex flex-col gap-1">
        {secondaryItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-3 font-normal text-muted-foreground hover:text-foreground hover:bg-fresh-blue/5",
                location.pathname === item.path && "bg-gradient-to-r from-fresh-blue/20 to-fresh-teal/20 text-fresh-blue font-medium"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                location.pathname === item.path && "text-fresh-blue"
              )} />
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
        {user && (
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-3 font-normal text-muted-foreground hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </Button>
        )}
      </nav>
    </div>
  );
};
