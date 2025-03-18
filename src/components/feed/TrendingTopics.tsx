
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface TrendingTopicsProps {
  topics: {
    id: string;
    name: string;
    postCount: number;
  }[];
}

export const TrendingTopics = ({ topics }: TrendingTopicsProps) => {
  return (
    <div className="glass-panel p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-5 w-5 text-accent" />
        <h3 className="font-semibold text-lg">Trending Topics</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <button 
            key={topic.id}
            className="bg-accent/10 hover:bg-accent/20 text-accent px-3 py-1 rounded-full text-sm transition-colors"
          >
            #{topic.name}
            <span className="ml-1 text-xs text-foreground/60">{formatNumber(topic.postCount)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to format numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
