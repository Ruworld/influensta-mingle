
import React from 'react';
import { Avatar as RadixAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}

export const Avatar = ({ 
  src, 
  alt, 
  fallback, 
  size = 'md', 
  status,
  className 
}: AvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };
  
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };
  
  return (
    <div className="relative">
      <RadixAvatar className={cn(sizeClasses[size], className)}>
        <AvatarImage src={src} alt={alt} className="object-cover" />
        <AvatarFallback className="font-medium">
          {fallback || alt.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </RadixAvatar>
      
      {status && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
