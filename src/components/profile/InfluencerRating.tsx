
import React, { useState } from 'react';
import { Star, Award, TrendingUp, Users, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface InfluencerRatingProps {
  profile: {
    id: string;
    influencerScore: number;
    influencerCategory: string;
    badgeLevel: string;
    endorsements: number;
    achievements?: {
      id: string;
      title: string;
      icon: string;
    }[];
  };
}

export const InfluencerRating = ({ profile }: InfluencerRatingProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const [endorsed, setEndorsed] = useState(false);
  const [endorsements, setEndorsements] = useState(profile.endorsements);
  
  const handleRating = (value: number) => {
    setRating(value);
    toast.success(`You rated this influencer ${value} stars!`);
  };
  
  const handleEndorse = () => {
    if (!endorsed) {
      setEndorsed(true);
      setEndorsements(prev => prev + 1);
      toast.success("You've endorsed this influencer!");
    } else {
      setEndorsed(false);
      setEndorsements(prev => prev - 1);
      toast.info("Endorsement removed");
    }
  };
  
  const getBadgeColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'gold':
        return 'bg-gradient-to-r from-yellow-300 to-amber-500';
      case 'silver':
        return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 'bronze':
        return 'bg-gradient-to-r from-amber-700 to-amber-600';
      case 'platinum':
        return 'bg-gradient-to-r from-indigo-300 to-purple-400';
      case 'diamond':
        return 'bg-gradient-to-r from-cyan-300 to-blue-500';
      default:
        return 'bg-gradient-to-r from-gray-200 to-gray-300';
    }
  };
  
  return (
    <div className="glass-panel p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-lg">Influencer Status</h3>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs">
              Rate & Review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center mb-4">
                Rate this Influencer
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex justify-center my-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="p-1"
                  onClick={() => handleRating(star)}
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-all",
                      rating && rating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>
            
            <Button 
              className="w-full mt-4 bg-accent hover:bg-accent/90"
              onClick={() => toast.success("Thank you for rating!")}
            >
              Submit Rating
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg text-center">
          <div className="flex justify-center mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={cn(
                  "h-4 w-4",
                  profile.influencerScore >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : profile.influencerScore >= star - 0.5
                    ? "fill-yellow-400/50 text-yellow-400"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Rating Score</p>
          <p className="text-xl font-semibold">{profile.influencerScore}</p>
        </div>
        
        <div className="p-3 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg text-center">
          <div className="mb-1">
            <span className={cn(
              "inline-block px-2 py-0.5 rounded-full text-xs text-white font-medium",
              getBadgeColor(profile.badgeLevel)
            )}>
              {profile.badgeLevel} Status
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Category</p>
          <p className="text-lg font-medium truncate">{profile.influencerCategory}</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <Button 
          variant={endorsed ? "default" : "outline"}
          size="sm" 
          className={cn(
            "w-full gap-2",
            endorsed ? "bg-accent hover:bg-accent/90" : ""
          )}
          onClick={handleEndorse}
        >
          <BadgeCheck className={cn(
            "h-4 w-4",
            endorsed ? "fill-white" : ""
          )} />
          {endorsed ? "Endorsed" : "Endorse"} ({endorsements.toLocaleString()})
        </Button>
        
        {profile.achievements && profile.achievements.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-1">
            {profile.achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className="relative group"
              >
                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                  {achievement.icon === 'trophy' && <Award className="h-4 w-4 text-accent" />}
                  {achievement.icon === 'zap' && <TrendingUp className="h-4 w-4 text-accent" />}
                  {achievement.icon === 'star' && <Star className="h-4 w-4 text-accent" />}
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity">
                  {achievement.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
