
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck,
  Users 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type RankLevel = 'bronze' | 'silver' | 'gold' | 'platinum';

interface RankDetails {
  name: string;
  icon: React.ElementType;
  color: string;
  backgroundColor: string;
  borderColor: string;
  description: string;
}

const rankConfig: Record<RankLevel, RankDetails> = {
  bronze: {
    name: 'Bronze Influencer',
    icon: Medal,
    color: 'text-amber-700',
    backgroundColor: 'bg-amber-100',
    borderColor: 'border-amber-200',
    description: 'Growing your influence. Keep engaging with your audience!',
  },
  silver: {
    name: 'Silver Influencer',
    icon: Award,
    color: 'text-slate-500',
    backgroundColor: 'bg-slate-100',
    borderColor: 'border-slate-200',
    description: 'Established creator with growing reach and engagement.',
  },
  gold: {
    name: 'Gold Influencer',
    icon: Trophy,
    color: 'text-amber-500',
    backgroundColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    description: 'Top creator with significant influence in your niche.',
  },
  platinum: {
    name: 'Platinum Influencer',
    icon: Star,
    color: 'text-primary',
    backgroundColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
    description: 'Elite influencer with extraordinary reach and impact.',
  },
};

export interface InfluencerRankingProps {
  // Current rank of the influencer
  rank: RankLevel;
  // Progress towards next rank (0-100)
  progress: number;
  // Stats to showcase their influence
  stats: {
    followers: number;
    engagement: number;
    reach: number;
    collaborations: number;
  };
}

export const InfluencerRanking = ({ rank, progress, stats }: InfluencerRankingProps) => {
  const currentRank = rankConfig[rank];
  const nextRank = rank === 'bronze' ? 'silver' : rank === 'silver' ? 'gold' : rank === 'gold' ? 'platinum' : null;
  const nextRankDetails = nextRank ? rankConfig[nextRank] : null;
  
  return (
    <div className="glass-panel p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Influencer Ranking</h3>
        </div>
      </div>
      
      <div className={cn(
        "p-4 rounded-lg border mb-4 flex items-center gap-3",
        currentRank.backgroundColor,
        currentRank.borderColor
      )}>
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          currentRank.backgroundColor
        )}>
          <currentRank.icon className={cn("h-7 w-7", currentRank.color)} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm">{currentRank.name}</h4>
            <Badge variant="outline" className={cn(currentRank.backgroundColor, "border-0")}>
              Level {rank === 'bronze' ? 1 : rank === 'silver' ? 2 : rank === 'gold' ? 3 : 4}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{currentRank.description}</p>
        </div>
      </div>
      
      {nextRankDetails && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-muted-foreground">Progress to {nextRankDetails.name}</p>
            <span className="text-xs font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-muted/50 p-3 rounded-lg text-center">
          <div className="flex justify-center mb-1">
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">Followers</p>
          <p className="font-semibold">{stats.followers.toLocaleString()}</p>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-lg text-center">
          <div className="flex justify-center mb-1">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">Engagement</p>
          <p className="font-semibold">{stats.engagement}%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted/50 p-3 rounded-lg text-center">
          <div className="flex justify-center mb-1">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">Reach</p>
          <p className="font-semibold">{stats.reach.toLocaleString()}</p>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-lg text-center">
          <div className="flex justify-center mb-1">
            <Award className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">Collaborations</p>
          <p className="font-semibold">{stats.collaborations}</p>
        </div>
      </div>
      
      <TooltipProvider>
        <div className="flex justify-center mt-4">
          {['bronze', 'silver', 'gold', 'platinum'].map((level) => {
            const levelConfig = rankConfig[level as RankLevel];
            const LevelIcon = levelConfig.icon;
            const isCurrentOrBeyond = 
              (rank === 'bronze' && level === 'bronze') ||
              (rank === 'silver' && (level === 'bronze' || level === 'silver')) ||
              (rank === 'gold' && level !== 'platinum') ||
              (rank === 'platinum');
            
            return (
              <Tooltip key={level}>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mx-1",
                    isCurrentOrBeyond ? levelConfig.backgroundColor : "bg-muted",
                  )}>
                    <LevelIcon className={cn(
                      "h-5 w-5", 
                      isCurrentOrBeyond ? levelConfig.color : "text-muted-foreground/30"
                    )} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{levelConfig.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
};
