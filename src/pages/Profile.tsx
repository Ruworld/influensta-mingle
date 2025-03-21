
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Camera, Grid, Video, FileBadge, Store, Gift, Edit, Link as LinkIcon, Save } from 'lucide-react';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { FeedPost } from '@/components/feed/FeedPost';
import { CollabRequest } from '@/components/profile/CollabRequest';
import { InfluencerRanking } from '@/components/profile/InfluencerRanking';
import { InfluencerRating } from '@/components/profile/InfluencerRating';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    username: '',
    bio: '',
    website: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('posts');
  const { user, profile, updateProfile } = useAuth();
  
  useEffect(() => {
    if (profile) {
      setProfileData({
        fullName: profile.full_name || '',
        username: profile.username || '',
        bio: profile.bio || '',
        website: profile.website || '',
      });
      
      if (profile.avatar_url) {
        setAvatarPreview(profile.avatar_url);
      }
    }
    
    fetchUserPosts();
  }, [profile]);
  
  const fetchUserPosts = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (username, full_name, avatar_url, is_verified)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        // Transform the data to match our component props
        const transformedPosts = await Promise.all(data.map(async (post) => {
          // Get total like count
          const { count } = await supabase
            .from('likes')
            .select('id', { count: 'exact' })
            .eq('post_id', post.id);
            
          const likeCount = count || 0;
          
          // Get comment count
          const { count: commentCount } = await supabase
            .from('comments')
            .select('id', { count: 'exact' })
            .eq('post_id', post.id);
          
          return {
            id: post.id,
            username: profile?.full_name || 'Anonymous',
            handle: profile?.username || 'user',
            avatar: profile?.avatar_url || 'https://source.unsplash.com/random/100x100/?portrait=1',
            content: post.content || '',
            image: post.image_url || undefined,
            video: post.video_url ? {
              url: post.video_url,
              type: post.video_type || 'fullVideo'
            } : undefined,
            timestamp: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }),
            likes: likeCount,
            comments: commentCount || 0,
            shares: Math.floor(Math.random() * 20), // Placeholder for shares
            liked: false,
            disliked: false,
            isVerified: profile?.is_verified || false,
            isTrending: likeCount > 100 // Just for demo
          };
        }));
        
        setUserPosts(transformedPosts);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    try {
      setIsUpdating(true);
      
      let avatarUrl = profile?.avatar_url;
      
      // Upload avatar if changed
      if (avatarFile) {
        setIsUploading(true);
        
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}.${fileExt}`;
        
        const { error: uploadError } = await supabase
          .storage
          .from('avatars')
          .upload(fileName, avatarFile, { upsert: true });
        
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase
          .storage
          .from('avatars')
          .getPublicUrl(fileName);
          
        avatarUrl = publicUrl;
        setIsUploading(false);
      }
      
      // Update profile
      await updateProfile({
        full_name: profileData.fullName,
        username: profileData.username,
        bio: profileData.bio,
        website: profileData.website,
        avatar_url: avatarUrl
      });
      
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
      setIsUploading(false);
    }
  };
  
  if (!user || !profile) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto pb-20">
        <ProfileHeader
          profile={{
            name: profile.full_name || 'User',
            username: profile.username || 'username',
            bio: profile.bio || '',
            website: profile.website || '',
            avatar: profile.avatar_url || '',
            isVerified: profile.is_verified || false,
            stats: {
              posts: userPosts.length,
              followers: 2345,
              following: 456,
            }
          }}
        />
        
        <div className="px-4 flex gap-3 mb-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 gap-2 bg-accent hover:bg-accent/90">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex justify-center mb-4">
                  <div className="relative group">
                    <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-accent">
                      <img 
                        src={avatarPreview || 'https://source.unsplash.com/random/100x100/?portrait=1'} 
                        alt="Avatar" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition-opacity">
                      <Camera className="h-6 w-6 text-white" />
                      <input 
                        type="file" 
                        className="sr-only" 
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input 
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input 
                    name="username"
                    value={profileData.username}
                    onChange={handleInputChange}
                    placeholder="username"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea 
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-muted rounded-l-md border border-r-0 border-input">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input 
                      name="website"
                      value={profileData.website}
                      onChange={handleInputChange}
                      placeholder="yourwebsite.com"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full gap-2 mt-4 bg-accent hover:bg-accent/90"
                  onClick={handleUpdateProfile}
                  disabled={isUpdating || isUploading}
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {isUploading ? 'Uploading...' : 'Updating...'}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="flex-1 gap-2">
            <LinkIcon className="h-4 w-4" />
            Share Profile
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full px-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="posts">
              <Grid className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="reels">
              <Video className="h-4 w-4 mr-2" />
              Reels
            </TabsTrigger>
            <TabsTrigger value="collabs">
              <FileBadge className="h-4 w-4 mr-2" />
              Collabs
            </TabsTrigger>
            <TabsTrigger value="store">
              <Store className="h-4 w-4 mr-2" />
              Store
            </TabsTrigger>
            <TabsTrigger value="earnings">
              <Gift className="h-4 w-4 mr-2" />
              Earnings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-6 space-y-6">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <FeedPost key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No posts yet</p>
                <p className="text-sm mb-6">Share your first post with the world!</p>
                <Button className="bg-accent hover:bg-accent/90">Create Post</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reels" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No reels yet</p>
              <p className="text-sm mb-6">Create your first reel!</p>
              <Button className="bg-accent hover:bg-accent/90">Create Reel</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="collabs" className="mt-6 space-y-6">
            <CollabRequest
              brand={{
                name: "FashionTrends",
                logo: "https://source.unsplash.com/random/100x100/?logo=1",
                verified: true
              }}
              offer={{
                amount: 500,
                description: "We'd love to collaborate with you on our new summer collection. This would involve 2 posts and 1 Story.",
                deadline: "May 30, 2023"
              }}
            />
            
            <CollabRequest
              brand={{
                name: "TechGadgets",
                logo: "https://source.unsplash.com/random/100x100/?logo=2",
                verified: true
              }}
              offer={{
                amount: 750,
                description: "Review our latest smartphone and share your honest opinions with your audience.",
                deadline: "June 15, 2023"
              }}
            />
          </TabsContent>
          
          <TabsContent value="store" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Your store is empty</p>
              <p className="text-sm mb-6">Add products to your store to start selling!</p>
              <Button className="bg-accent hover:bg-accent/90">Add Products</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="earnings" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6">
              <h3 className="text-lg font-medium mb-4">Influencer Stats</h3>
              <InfluencerRanking rank="Rising Star" percentile={85} />
              <InfluencerRating rating={4.7} reviews={28} />
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Engagement Rate</h4>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '68%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">0%</span>
                  <span className="text-xs font-medium">6.8%</span>
                  <span className="text-xs text-muted-foreground">10%</span>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-6">
              <h3 className="text-lg font-medium mb-4">Earnings Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">This Month</span>
                  <span className="font-medium">$1,250</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Month</span>
                  <span className="font-medium">$980</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Earnings</span>
                  <span className="font-medium">$8,735</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pending Payments</span>
                  <span className="font-medium">$450</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-accent hover:bg-accent/90">Withdraw Funds</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
