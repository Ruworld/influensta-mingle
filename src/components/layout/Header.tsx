
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Heart, Search, LogOut, Settings, User, Bookmark, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const { user, profile, signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-background/80 border-b border-border flex items-center px-4 md:px-6">
      <div className="flex-1 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold text-2xl tracking-tight text-foreground instagram-gradient bg-clip-text text-transparent">
            influensta
          </Link>
        </div>
        
        <div className="hidden md:flex relative max-w-md">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-9 w-full bg-muted/50 border-none focus-visible:ring-accent"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/notifications" className="relative text-muted-foreground hover:text-foreground md:block hidden">
            <Bell className="h-6 w-6" />
            <span className="fomo-badge">3</span>
          </Link>
          
          <Link to="/messages" className="relative text-muted-foreground hover:text-foreground md:block hidden">
            <MessageCircle className="h-6 w-6" />
            <span className="fomo-badge">5</span>
          </Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0">
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src={profile?.avatar_url || "https://source.unsplash.com/random/100x100/?portrait"} alt={profile?.full_name || "User"} />
                    <AvatarFallback>{profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{profile?.full_name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      @{profile?.username || "username"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/saved" className="flex items-center gap-2 cursor-pointer">
                    <Bookmark className="h-4 w-4" />
                    <span>Saved</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
