import React, { useState } from 'react';
import { Image, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const CreatePostButton = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setImagePreview(null);
  };
  
  const handleSubmit = () => {
    if (!content.trim() && !imagePreview) {
      return;
    }
    
    // Here we would normally submit the post to an API
    console.log("Submitting post:", { content, imagePreview });
    
    toast.success("Post created successfully!");
    setContent('');
    setImagePreview(null);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2 bg-accent hover:bg-accent/90">
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-start gap-3 pt-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://source.unsplash.com/random/100x100/?portrait" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="What's happening?"
              className="resize-none border-none bg-transparent focus-visible:ring-0 p-0 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
            
            {imagePreview && (
              <div className="relative mt-3 rounded-lg overflow-hidden">
                <img src={imagePreview} alt="Upload preview" className="w-full h-auto max-h-[300px] object-cover" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-foreground/20 hover:bg-destructive"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-accent"
                  asChild
                >
                  <label>
                    <Image className="h-5 w-5" />
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </Button>
              </div>
              
              <Button 
                className="bg-accent hover:bg-accent/90"
                onClick={handleSubmit}
                disabled={!content.trim() && !imagePreview}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
