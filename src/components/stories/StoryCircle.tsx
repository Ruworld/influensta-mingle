
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';

interface StoryCircleProps {
  story: {
    id: string;
    username: string;
    avatar: string;
    hasNewStory: boolean;
    isVerified?: boolean;
  };
  isCurrentUser?: boolean;
}

export const StoryCircle = ({ story, isCurrentUser = false }: StoryCircleProps) => {
  return (
    <Link 
      to={isCurrentUser ? "/create-story" : `/stories/${story.id}`}
      className="flex flex-col items-center gap-1 min-w-[72px]"
    >
      <div className="relative">
        <div 
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center p-0.5",
            story.hasNewStory 
              ? "bg-gradient-to-tr from-yellow-400 via-orange-500 to-pink-500" 
              : "bg-muted",
            isCurrentUser && "bg-gradient-to-tr from-blue-400 to-accent"
          )}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
            {isCurrentUser ? (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <PlusCircle className="h-8 w-8 text-accent" />
              </div>
            ) : (
              <img 
                src={story.avatar} 
                alt={story.username} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        
        {story.isVerified && (
          <div className="absolute bottom-0 right-0 bg-accent text-white p-0.5 rounded-full border-2 border-background">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      <span className="text-xs truncate max-w-[80px] text-center">
        {isCurrentUser ? "Your Story" : story.username}
      </span>
    </Link>
  );
};
