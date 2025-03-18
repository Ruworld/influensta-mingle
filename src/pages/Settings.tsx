
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Bell, 
  Shield, 
  Eye, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  Sparkles 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  urls: z.object({
    website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  }),
});

const notificationFormSchema = z.object({
  newFollower: z.boolean().default(true),
  newComment: z.boolean().default(true),
  newLike: z.boolean().default(true),
  messagingEnabled: z.boolean().default(true),
  emailNotifications: z.boolean().default(false),
});

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Password</h3>
        <p className="text-sm text-muted-foreground">
          Update your password to keep your account secure.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current password</Label>
          <Input id="current-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New password</Label>
          <Input id="new-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <Input id="confirm-password" type="password" />
        </div>
        <Button>Update password</Button>
      </div>
      
      <div className="space-y-4 pt-6 border-t">
        <div>
          <h3 className="text-lg font-medium">Two-factor authentication</h3>
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your account.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Two-factor authentication</p>
            <p className="text-sm text-muted-foreground">
              Protect your account with 2FA.
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
};

const PrivacySettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Profile visibility</p>
            <p className="text-sm text-muted-foreground">
              Make your profile visible to everyone.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Show activity status</p>
            <p className="text-sm text-muted-foreground">
              Allow people to see when you're active.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Allow mentions</p>
            <p className="text-sm text-muted-foreground">
              Allow others to mention you in their posts.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Allow message requests</p>
            <p className="text-sm text-muted-foreground">
              Receive message requests from people you don't follow.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
      
      <div className="space-y-4 pt-6 border-t">
        <div>
          <h3 className="text-lg font-medium">Data and privacy</h3>
          <p className="text-sm text-muted-foreground">
            Manage your personal data and privacy settings.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Download your data
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Manage blocked accounts
          </Button>
        </div>
      </div>
    </div>
  );
};

const PremiumSettings = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-6 w-6" />
          <h3 className="text-xl font-semibold">Premium Features</h3>
        </div>
        
        <p className="mb-6">
          Unlock premium features to enhance your social media experience and grow your influence.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <h4 className="font-medium mb-2">Analytics Dashboard</h4>
            <p className="text-sm">Get detailed insights about your audience and content performance.</p>
          </div>
          
          <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <h4 className="font-medium mb-2">Priority Visibility</h4>
            <p className="text-sm">Get your content seen by more people in their feeds.</p>
          </div>
          
          <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <h4 className="font-medium mb-2">Ad-Free Experience</h4>
            <p className="text-sm">Enjoy the platform without any advertisements.</p>
          </div>
          
          <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <h4 className="font-medium mb-2">Exclusive Badges</h4>
            <p className="text-sm">Stand out with premium badges next to your name.</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <div>
              <h4 className="font-medium">Monthly</h4>
              <p className="text-sm">$9.99 per month</p>
            </div>
            <Button className="bg-white text-indigo-600 hover:bg-white/90">
              Subscribe
            </Button>
          </div>
          
          <div className="flex items-center justify-between bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <div>
              <h4 className="font-medium">Annual</h4>
              <p className="text-sm">$99.99 per year (Save 17%)</p>
            </div>
            <Button className="bg-white text-indigo-600 hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 pt-6">
        <div>
          <h3 className="text-lg font-medium">Current Plan</h3>
          <p className="text-sm text-muted-foreground">
            You are currently on the Free Plan.
          </p>
        </div>
        
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            View billing history
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Manage payment methods
          </Button>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "yourname",
      email: "your.email@example.com",
      bio: "Digital creator | Photography enthusiast | Always exploring",
      urls: {
        website: "",
      },
    },
  });
  
  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      newFollower: true,
      newComment: true,
      newLike: true,
      messagingEnabled: true,
      emailNotifications: false,
    },
  });
  
  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values);
    // In a real app, you would update the user's profile here
  }
  
  function onNotificationSubmit(values: z.infer<typeof notificationFormSchema>) {
    console.log(values);
    // In a real app, you would update the user's notification settings here
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <TabsList className="flex md:flex-col h-auto p-1 mb-4 md:mb-0 md:w-[200px] md:mr-6">
              <TabsTrigger value="profile" className="flex items-center gap-2 justify-start w-full py-2 px-3">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2 justify-start w-full py-2 px-3">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2 justify-start w-full py-2 px-3">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2 justify-start w-full py-2 px-3">
                <Eye className="h-4 w-4" />
                <span>Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="premium" className="flex items-center gap-2 justify-start w-full py-2 px-3">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span>Premium</span>
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center gap-2 justify-start w-full py-2 px-3">
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 glass-panel p-6">
              <TabsContent value="profile" className="mt-0">
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Profile Information</h3>
                      <p className="text-sm text-muted-foreground">
                        Update your profile information and how others see you on the platform.
                      </p>
                    </div>
                    
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Your email address is used for notifications and sign-in.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Tell others a little about yourself.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="urls.website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://example.com" />
                          </FormControl>
                          <FormDescription>
                            Add your website or portfolio link.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Save changes</Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <Form {...notificationForm}>
                  <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Notification Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure how and when you receive notifications.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <FormField
                        control={notificationForm.control}
                        name="newFollower"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-normal">New Follower</FormLabel>
                              <FormDescription>
                                Receive a notification when someone follows you.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="newComment"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-normal">Comments</FormLabel>
                              <FormDescription>
                                Get notified when someone comments on your post.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="newLike"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-normal">Likes</FormLabel>
                              <FormDescription>
                                Get notified when someone likes your post.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="messagingEnabled"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-normal">Messaging</FormLabel>
                              <FormDescription>
                                Get notified about new messages.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-normal">Email Notifications</FormLabel>
                              <FormDescription>
                                Receive email notifications for important updates.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit">Save preferences</Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <SecuritySettings />
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-0">
                <PrivacySettings />
              </TabsContent>
              
              <TabsContent value="premium" className="mt-0">
                <PremiumSettings />
              </TabsContent>
              
              <TabsContent value="help" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Help & Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Get help with your account or report an issue.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Frequently Asked Questions</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Find answers to common questions about using the platform.
                      </p>
                      <Button variant="outline" className="w-full">View FAQs</Button>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Contact Support</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Need help with something specific? Contact our support team.
                      </p>
                      <Button variant="outline" className="w-full">Contact Support</Button>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-2">Report a Problem</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Found a bug or having technical issues? Let us know.
                      </p>
                      <Button variant="outline" className="w-full">Report a Problem</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
