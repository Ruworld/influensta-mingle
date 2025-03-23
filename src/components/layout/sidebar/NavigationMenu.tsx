
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  MessageCircle, 
  Bell, 
  User, 
  Play,
  Film,
  Users,
  ShoppingBag,
  Megaphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: {
    content: string | number;
    color: string;
  };
}

interface NavigationMenuProps {
  communityStats: {
    activeMembersToday: number;
  };
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ communityStats }) => {
  const location = useLocation();
  
  const menuItems: MenuItem[] = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Play, label: 'Reels', path: '/reels' },
    { icon: Film, label: 'Shorts', path: '/shorts' },
    { 
      icon: Users, 
      label: 'Community', 
      path: '/community',
      badge: {
        content: communityStats.activeMembersToday,
        color: 'bg-fresh-blue text-white'
      }
    },
    { 
      icon: ShoppingBag, 
      label: 'Marketplace', 
      path: '/merchandise',
      badge: {
        content: 'NEW',
        color: 'bg-fresh-teal text-white'
      }
    },
    { icon: Megaphone, label: 'Promotions', path: '/promotions' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="flex flex-col gap-1">
      {menuItems.map((item) => (
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
            {item.badge && (
              <Badge className={`ml-auto ${item.badge.color} text-[10px] px-1.5`}>
                {typeof item.badge.content === 'number' 
                  ? item.badge.content.toLocaleString() 
                  : item.badge.content}
              </Badge>
            )}
          </Button>
        </Link>
      ))}
    </nav>
  );
};
