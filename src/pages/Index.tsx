
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl mx-auto space-y-8 text-center">
        <div className="space-y-4">
          <div className="relative inline-block">
            <span className="bg-gradient-to-r from-fresh-blue via-fresh-teal to-fresh-cyan bg-clip-text text-transparent text-4xl md:text-6xl font-bold">
              influensta
            </span>
            <Sparkles className="absolute -top-6 -right-6 h-5 w-5 text-fresh-teal animate-pulse" />
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
            Connect. Create. Influence.
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Join the next generation social platform designed for creators, influencers, and brands to connect and grow together.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          {!user ? (
            <>
              <Button asChild size="lg" className="bg-gradient-to-r from-fresh-blue to-fresh-teal hover:from-fresh-blue/90 hover:to-fresh-teal/90">
                <Link to="/sign-up">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </>
          ) : (
            <Button asChild size="lg" className="bg-gradient-to-r from-fresh-blue to-fresh-teal hover:from-fresh-blue/90 hover:to-fresh-teal/90">
              <Link to="/">Go to Feed</Link>
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="bg-background/60 backdrop-blur-sm border border-border p-6 rounded-xl hover:shadow-md transition-all">
            <div className="flex justify-center mb-4">
              <div className="bg-fresh-blue/10 p-3 rounded-full">
                <Users className="h-8 w-8 text-fresh-blue" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground">Connect with like-minded creators and build your audience</p>
          </div>
          
          <div className="bg-background/60 backdrop-blur-sm border border-border p-6 rounded-xl hover:shadow-md transition-all">
            <div className="flex justify-center mb-4">
              <div className="bg-fresh-teal/10 p-3 rounded-full">
                <ShoppingBag className="h-8 w-8 text-fresh-teal" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Merchandise</h3>
            <p className="text-muted-foreground">Launch and sell your branded products directly to followers</p>
          </div>
          
          <div className="bg-background/60 backdrop-blur-sm border border-border p-6 rounded-xl hover:shadow-md transition-all">
            <div className="flex justify-center mb-4">
              <div className="bg-fresh-green/10 p-3 rounded-full">
                <TrendingUp className="h-8 w-8 text-fresh-green" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-muted-foreground">Track your growth and understand your audience</p>
          </div>
        </div>
        
        <div className="pt-12">
          <Link to="/explore" className="inline-flex items-center gap-2 text-fresh-blue hover:underline">
            Explore trending content
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
