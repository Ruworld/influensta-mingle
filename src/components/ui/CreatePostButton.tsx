import React, { useState, useRef } from 'react';
import { Image, X, Video, Film } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export const CreatePostButton = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoType, setVideoType] = useState<'reel' | 'fullVideo' | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageFile = useRef<File | null>(null);
  const videoFile = useRef<File | null>(null);
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoPreview(null);
      setVideoType(null);
      videoFile.current = null;
      
      imageFile.current = file;
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'reel' | 'fullVideo') => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(null);
      imageFile.current = null;
      
      videoFile.current = file;
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          
          const reader = new FileReader();
          reader.onloadend = () => {
            setVideoPreview(reader.result as string);
            setVideoType(type);
          };
          reader.readAsDataURL(file);
        }
      }, 100);
    }
  };
  
  const handleRemoveMedia = () => {
    setImagePreview(null);
    setVideoPreview(null);
    setVideoType(null);
    setUploadProgress(0);
    imageFile.current = null;
    videoFile.current = null;
  };
  
  const checkVideoDuration = (video: HTMLVideoElement, type: 'reel' | 'fullVideo') => {
    if (type === 'reel' && video.duration > 30) {
      toast.error("Reels must be 30 seconds or less. Please trim your video or upload as a full video.");
      handleRemoveMedia();
      return false;
    }
    return true;
  };

  const uploadMedia = async () => {
    if (imageFile.current) {
      const fileExt = imageFile.current.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${user!.id}/${fileName}`;
      
      const { error: uploadError, data } = await supabase
        .storage
        .from('post-media')
        .upload(filePath, imageFile.current);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase
        .storage
        .from('post-media')
        .getPublicUrl(filePath);
        
      return { url: publicUrl, type: 'image' };
    }
    
    if (videoFile.current) {
      const fileExt = videoFile.current.name.split('.').pop();
      const fileName = `${user!.id}/${uuidv4()}.${fileExt}`;
      
      const { error: uploadError } = await supabase
        .storage
        .from('post-media')
        .upload(fileName, videoFile.current);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase
        .storage
        .from('post-media')
        .getPublicUrl(fileName);
        
      return { url: publicUrl, type: 'video' };
    }
    
    return null;
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to create a post");
      navigate('/sign-in');
      return;
    }
    
    if (!content.trim() && !imagePreview && !videoPreview) {
      toast.error("Please add some content to your post");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      let mediaUrl: string | null = null;
      let videoUrl: string | null = null;
      
      if (imageFile.current || videoFile.current) {
        const media = await uploadMedia();
        if (media) {
          if (media.type === 'image') {
            mediaUrl = media.url;
          } else {
            videoUrl = media.url;
          }
        }
      }
      
      const { error: postError } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content: content.trim(),
          image_url: mediaUrl,
          video_url: videoUrl,
          video_type: videoType
        });
      
      if (postError) throw postError;
      
      toast.success("Post created successfully!");
      setContent('');
      setImagePreview(null);
      setVideoPreview(null);
      setVideoType(null);
      setUploadProgress(0);
      imageFile.current = null;
      videoFile.current = null;
      setOpen(false);
      
      window.location.reload();
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast.error(error.message || "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2 bg-accent hover:bg-accent/90" onClick={() => {
          if (!user) {
            toast.error("Please sign in to create a post");
            navigate('/sign-in');
            return;
          }
        }}>
          Create Post
        </Button>
      </DialogTrigger>
      {user && (
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
          </DialogHeader>
          
          <div className="flex items-start gap-3 pt-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile?.avatar_url || ""} alt={profile?.username || "User"} />
              <AvatarFallback>{profile?.username?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <Textarea
                placeholder="What's happening?"
                className="resize-none border-none bg-transparent focus-visible:ring-0 p-0 text-base"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
              />
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground mb-1">Uploading video... {uploadProgress}%</p>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
              
              {imagePreview && (
                <div className="relative mt-3 rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Upload preview" className="w-full h-auto max-h-[300px] object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-foreground/20 hover:bg-destructive"
                    onClick={handleRemoveMedia}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {videoPreview && (
                <div className="relative mt-3 rounded-lg overflow-hidden">
                  <video 
                    ref={videoRef}
                    src={videoPreview} 
                    className="w-full h-auto max-h-[300px] object-cover" 
                    controls
                    onLoadedMetadata={() => {
                      if (videoRef.current && videoType) {
                        checkVideoDuration(videoRef.current, videoType);
                      }
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-foreground/20 hover:bg-destructive"
                      onClick={handleRemoveMedia}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {videoType === 'reel' && (
                    <div className="absolute top-2 left-2 bg-accent/70 text-white text-xs px-2 py-1 rounded-full">
                      Reel
                    </div>
                  )}
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
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full text-accent"
                      >
                        <Video className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Video className="h-4 w-4" />
                          <span>Upload Reel (30s)</span>
                          <input
                            ref={videoInputRef}
                            type="file"
                            className="sr-only"
                            accept="video/*"
                            onChange={(e) => handleVideoUpload(e, 'reel')}
                          />
                        </label>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Film className="h-4 w-4" />
                          <span>Upload Full Video</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="video/*"
                            onChange={(e) => handleVideoUpload(e, 'fullVideo')}
                          />
                        </label>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <Button 
                  className="bg-accent hover:bg-accent/90"
                  onClick={handleSubmit}
                  disabled={(!content.trim() && !imagePreview && !videoPreview) || isSubmitting}
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
