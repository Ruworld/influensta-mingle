
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
  
  // Default dog image URLs for fallbacks
  const dogImages = [
    'https://images.dog.ceo/breeds/retriever-golden/n02099601_1722.jpg',
    'https://images.dog.ceo/breeds/retriever-golden/n02099601_3861.jpg',
    'https://images.dog.ceo/breeds/retriever-flatcoated/n02099267_1423.jpg',
    'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_1392.jpg',
    'https://images.dog.ceo/breeds/terrier-norwich/n02094258_1003.jpg'
  ];
  
  // Select a deterministic dog image based on the alt text
  const getDefaultDogImage = () => {
    const index = alt.length % dogImages.length;
    return dogImages[index];
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = getDefaultDogImage();
  };
  
  return (
    <div className="relative">
      <RadixAvatar className={cn(sizeClasses[size], className)}>
        <AvatarImage 
          src={src || getDefaultDogImage()} 
          alt={alt} 
          className="object-cover" 
          onError={handleImageError}
        />
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
