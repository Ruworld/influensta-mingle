
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  TrendingUp, 
  BarChart4, 
  Users, 
  Star, 
  Check, 
  ArrowRight, 
  Clock,
  Info,
  User,
  Play,
  Film,
  MessageCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Boost = () => {
  const [boostAmount, setBoostAmount] = useState([100]);
  const [boostDays, setBoostDays] = useState([3]);
  
  // Sample content to boost
  const userContent = [
    {
      id: '1',
      type: 'reel',
      title: 'Morning routine in NYC #morningroutine #nyc',
      views: '1.2K',
      likes: '124',
      thumbnail: 'https://images.unsplash.com/photo-1518331483807-f6adb0e1ad23?q=80&w=2069',
      date: '2 days ago',
    },
    {
      id: '2',
      type: 'short',
      title: 'Quick photography tip that will change your game!',
      views: '3.5K',
      likes: '287',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000',
      date: '1 week ago',
    },
    {
      id: '3',
      type: 'post',
      title: "My journey as a creator - what I've learned in the first year",
      views: '842',
      likes: '98',
      thumbnail: 'https://images.unsplash.com/photo-1500081334385-7766153fc642?q=80&w=2069',
      date: '3 days ago',
    },
  ];
  
  // Calculate boost metrics
  const estimatedReach = Math.floor(boostAmount[0] * boostDays[0] * 150);
  const estimatedEngagement = Math.floor(estimatedReach * 0.08);
  const totalCost = boostAmount[0] * boostDays[0];
  
  return (
    <Layout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Boost Your Content</h1>
            <p className="text-muted-foreground">Get more visibility and engagement for your content</p>
          </div>
          <Badge className="bg-gradient-to-r from-vibrant-pink to-vibrant-purple text-white px-3 py-1 gap-1">
            <Zap className="h-4 w-4" />
            Boost available
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2 border-vibrant-pink/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-vibrant-pink" />
                Boost Settings
              </CardTitle>
              <CardDescription>
                Configure how you want to boost your content and reach more people
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Daily Budget (₹)</label>
                  <span className="text-lg font-bold text-vibrant-pink">₹{boostAmount[0]}</span>
                </div>
                <Slider
                  value={boostAmount}
                  min={100}
                  max={1000}
                  step={50}
                  onValueChange={setBoostAmount}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Min: ₹100</span>
                  <span>Max: ₹1,000</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Duration (Days)</label>
                  <span className="text-lg font-bold text-vibrant-pink">{boostDays[0]} days</span>
                </div>
                <Slider
                  value={boostDays}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={setBoostDays}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Min: 1 day</span>
                  <span>Max: 30 days</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Select Content to Boost</h3>
                <div className="space-y-3">
                  {userContent.map((content) => (
                    <div 
                      key={content.id} 
                      className="flex items-center gap-3 p-2 border border-border rounded-lg hover:border-vibrant-pink/30 cursor-pointer transition-all"
                    >
                      <div className="relative h-16 w-24 flex-shrink-0 rounded overflow-hidden">
                        <img src={content.thumbnail} alt={content.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          {content.type === 'reel' && <Play className="h-5 w-5 text-white" />}
                          {content.type === 'short' && <Film className="h-5 w-5 text-white" />}
                          {content.type === 'post' && <MessageCircle className="h-5 w-5 text-white" />}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{content.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span>{content.views} views</span>
                          <span>{content.likes} likes</span>
                          <span>{content.date}</span>
                        </div>
                      </div>
                      <Radio selected={content.id === '1'} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Target Audience</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-border rounded-lg p-3 hover:border-vibrant-pink/30 cursor-pointer transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Similar to your followers</span>
                      <Radio selected={true} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Reach people similar to your existing audience
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-3 hover:border-vibrant-pink/30 cursor-pointer transition-all opacity-60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Custom audience</span>
                      <Radio selected={false} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Define your own target audience (coming soon)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-gradient-to-r from-vibrant-pink to-vibrant-purple gap-2 animate-pulse-scale">
                <Zap className="h-4 w-4" />
                Start Boost for ₹{totalCost}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-6">
            <Card className="border-vibrant-pink/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart4 className="h-5 w-5 text-vibrant-pink" />
                  Boost Preview
                </CardTitle>
                <CardDescription>
                  Estimated performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Estimated reach</span>
                    <span className="font-bold text-vibrant-pink">{estimatedReach.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-vibrant-pink to-vibrant-purple" style={{ width: `${(estimatedReach / 10000) * 100}%` }}></div>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Est. engagement</span>
                    <span className="font-bold text-vibrant-pink">{estimatedEngagement.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-vibrant-pink to-vibrant-purple" style={{ width: `${(estimatedEngagement / 1000) * 100}%` }}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm p-2">
                  <span className="text-muted-foreground">Total budget</span>
                  <span className="font-semibold">₹{totalCost}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm p-2">
                  <span className="text-muted-foreground">Cost per 1K views</span>
                  <span className="font-semibold">~₹{((totalCost / estimatedReach) * 1000).toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm p-2">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">{boostDays[0]} days</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-vibrant-pink/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-vibrant-pink" />
                  Success Stories
                </CardTitle>
                <CardDescription>
                  See how others are growing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar url="https://i.pravatar.cc/150?img=1" />
                    <div>
                      <p className="text-sm">"Gained 800+ followers after boosting my photography reel for just 5 days!"</p>
                      <div className="flex items-center mt-1">
                        <div className="flex mr-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-vibrant-yellow fill-vibrant-yellow" />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">@travel_emma</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Avatar url="https://i.pravatar.cc/150?img=2" />
                    <div>
                      <p className="text-sm">"My merchandise sales doubled after boosting my product showcase video."</p>
                      <div className="flex items-center mt-1">
                        <div className="flex mr-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-vibrant-yellow fill-vibrant-yellow" />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">@techreview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-vibrant-pink/10 to-vibrant-purple/10 rounded-lg p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-vibrant-pink" />
            <h3 className="font-semibold">Why Boost Your Content?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-background/60 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-vibrant-pink/20 text-vibrant-pink">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h4 className="font-medium">Increase Visibility</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Get your content seen by up to 5x more people than organic reach.
              </p>
            </div>
            
            <div className="bg-background/60 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-vibrant-pink/20 text-vibrant-pink">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="font-medium">Grow Your Audience</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Attract new followers interested in your content and niche.
              </p>
            </div>
            
            <div className="bg-background/60 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-vibrant-pink/20 text-vibrant-pink">
                  <Zap className="h-5 w-5" />
                </div>
                <h4 className="font-medium">Go Viral</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Boosted content is 3x more likely to be shared and go viral.
              </p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="active" className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="active" className="data-[state=active]:bg-vibrant-pink/20 data-[state=active]:text-vibrant-pink">
              Active Boosts
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-vibrant-pink/20 data-[state=active]:text-vibrant-pink">
              Completed
            </TabsTrigger>
            <TabsTrigger value="drafts" className="data-[state=active]:bg-vibrant-pink/20 data-[state=active]:text-vibrant-pink">
              Drafts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4">
              <Clock className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No Active Boosts</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                You don't have any active content boosts running. Start your first boost to increase your reach and engagement.
              </p>
              <Button className="bg-vibrant-pink text-white hover:bg-vibrant-purple gap-2 mt-2">
                <Zap className="h-4 w-4" />
                Create Your First Boost
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4">
              <Check className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No Completed Boosts</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                You haven't completed any content boosts yet. Start your first boost to see the results here.
              </p>
              <Button className="bg-vibrant-pink text-white hover:bg-vibrant-purple mt-2">View Boost Options</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="drafts" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4">
              <User className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No Saved Drafts</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                You don't have any saved draft boosts. Configure a boost and save it as a draft to use later.
              </p>
              <Button className="bg-vibrant-pink text-white hover:bg-vibrant-purple mt-2">Create New Boost</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Small components for the page
const Avatar = ({ url }: { url: string }) => (
  <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
    <img src={url} alt="User avatar" className="h-full w-full object-cover" />
  </div>
);

const Radio = ({ selected }: { selected: boolean }) => (
  <div className={`h-5 w-5 rounded-full border ${selected ? 'border-vibrant-pink' : 'border-muted-foreground'} flex items-center justify-center`}>
    {selected && <div className="h-3 w-3 rounded-full bg-vibrant-pink"></div>}
  </div>
);

export default Boost;
