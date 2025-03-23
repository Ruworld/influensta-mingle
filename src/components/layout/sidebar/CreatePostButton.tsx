
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CreatePostButton = () => {
  return (
    <div className="px-3 py-2">
      <Button className="w-full gap-2 bg-gradient-to-r from-fresh-blue to-fresh-teal hover:opacity-90 animate-pulse-scale">
        <Plus className="h-5 w-5" />
        <span>New Post</span>
      </Button>
    </div>
  );
};
