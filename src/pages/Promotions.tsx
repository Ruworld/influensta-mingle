
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Megaphone, 
  TrendingUp, 
  BarChart3, 
  Search, 
  Plus, 
  Calendar,
  Users,
  Clock,
  ShoppingBag,
  Tag,
  ArrowRight,
  ChevronRight,
  Award
} from 'lucide-react';

const Promotions = () => {
  // Sample promotions data
  const promotions = [
    {
      id: '1',
      title: 'Photography Masterclass - 50% OFF',
      community: 'Photography Enthusiasts',
      originalPrice: '₹1,999',
      discountedPrice: '₹999',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000',
      expiresIn: '3 days',
      type: 'course',
      featured: true,
    },
    {
      id: '2',
      title: 'Travel Vlog Preset Bundle',
      community: 'Travel Creators',
      originalPrice: '₹799',
      discountedPrice: '₹499',
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000',
      expiresIn: '5 days',
      type: 'digital',
      featured: false,
    },
    {
      id: '3',
      title: 'Free 7-Day Fitness Challenge',
      community: 'Fitness Motivation',
      originalPrice: '₹499',
      discountedPrice: 'FREE',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000',
      expiresIn: '2 days',
      type: 'challenge',
      featured: true,
    },
  ];

  return (
    <Layout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Promotions</h1>
            <p className="text-muted-foreground">Discover special offers from communities</p>
          </div>
          <Button className="bg-gradient-to-r from-fresh-blue to-fresh-teal gap-2">
            <Plus className="h-4 w-4" />
            Create Promotion
          </Button>
        </div>

        <div className="relative mb-6">
          <Input 
            placeholder="Search promotions..." 
            className="pl-10 bg-background border-fresh-blue/20 focus-visible:ring-fresh-blue/30"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="bg-gradient-to-br from-fresh-blue to-fresh-teal rounded-lg p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Badge className="bg-white/20 text-white mb-2">Featured Promotion</Badge>
              <h2 className="text-2xl font-bold mb-1">Creator Pro Membership</h2>
              <p className="opacity-90 mb-2">Get access to exclusive tools, resources, and community support</p>
              <div className="flex items-center gap-2">
                <span className="line-through opacity-70">₹1,999/year</span>
                <span className="text-xl font-bold">₹999/year</span>
                <Badge className="bg-white text-fresh-blue ml-2">50% OFF</Badge>
              </div>
            </div>
            <Button className="bg-white text-fresh-blue hover:bg-white/90">
              Claim Offer
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              All Offers
            </TabsTrigger>
            <TabsTrigger value="my-communities" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              My Communities
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              Courses
            </TabsTrigger>
            <TabsTrigger value="merchandise" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              Merchandise
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {promotions.map((promo) => (
                <Card key={promo.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="h-40 relative">
                    <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
                    <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-black/50 to-transparent p-3">
                      <Badge className="bg-fresh-blue text-white">
                        {promo.community}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                      <div className="flex items-center text-white text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Expires in {promo.expiresIn}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-medium mb-2">{promo.title}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground line-through mr-2">{promo.originalPrice}</span>
                        <span className="font-bold text-fresh-blue">{promo.discountedPrice}</span>
                      </div>
                      <Badge className={`${promo.type === 'digital' ? 'bg-fresh-teal' : promo.type === 'course' ? 'bg-fresh-indigo' : 'bg-fresh-lime'} text-white`}>
                        {promo.type === 'digital' ? 'Digital' : promo.type === 'course' ? 'Course' : 'Challenge'}
                      </Badge>
                    </div>
                    <Button className="w-full mt-3 bg-fresh-blue text-white hover:bg-fresh-indigo">
                      View Offer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" className="gap-1">
                View All Promotions <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="my-communities" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promotions.filter(p => p.featured).map((promo) => (
                <Card key={promo.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-full">
                      <img src={promo.image} alt={promo.title} className="h-40 md:h-full w-full object-cover" />
                    </div>
                    <div className="md:w-2/3 p-4">
                      <Badge className="mb-2 bg-fresh-blue text-white">
                        {promo.community}
                      </Badge>
                      <h3 className="font-medium mb-2">{promo.title}</h3>
                      <div className="flex items-center mb-3">
                        <span className="text-sm text-muted-foreground line-through mr-2">{promo.originalPrice}</span>
                        <span className="font-bold text-fresh-blue">{promo.discountedPrice}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Expires in {promo.expiresIn}</span>
                      </div>
                      <Button className="w-full bg-fresh-blue text-white hover:bg-fresh-indigo">
                        View Offer
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <Card className="mt-4 border-dashed">
              <CardContent className="flex flex-col items-center justify-center text-center p-6">
                <Award className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">Join more communities</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md">
                  Join communities to discover more exclusive promotions and offers from creators in your niche.
                </p>
                <Button className="bg-fresh-blue text-white hover:bg-fresh-indigo">
                  Explore Communities
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {promotions.filter(p => p.type === 'course').map((promo) => (
                <Card key={promo.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="h-40 relative">
                    <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
                    <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-black/50 to-transparent p-3">
                      <Badge className="bg-fresh-indigo text-white">
                        Course
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-medium mb-1">{promo.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">By {promo.community}</p>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-sm text-muted-foreground line-through mr-2">{promo.originalPrice}</span>
                        <span className="font-bold text-fresh-blue">{promo.discountedPrice}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{promo.expiresIn}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-fresh-indigo text-white hover:bg-fresh-blue">
                      View Course
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed flex flex-col items-center justify-center p-6 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="font-medium mb-2">Create Your Own Course</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Share your knowledge and skills by creating and selling courses to your community
                </p>
                <Button className="bg-fresh-indigo text-white hover:bg-fresh-blue">
                  Start Creating
                </Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="merchandise" className="mt-0">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-fresh-teal" />
                  Community Merchandise
                </CardTitle>
                <CardDescription>
                  Products and merchandise from communities you're part of
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between bg-fresh-teal/10 rounded-lg p-4 mb-4">
                  <div>
                    <h3 className="font-medium mb-1">Looking for merchandise?</h3>
                    <p className="text-sm text-muted-foreground">
                      Check out our dedicated marketplace for community merchandise
                    </p>
                  </div>
                  <Button className="bg-fresh-teal text-white hover:bg-fresh-blue">
                    Go to Marketplace
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="h-10 w-10 text-fresh-teal p-2 bg-fresh-teal/10 rounded-full" />
                        <div>
                          <h3 className="font-medium">Buy from Communities</h3>
                          <p className="text-sm text-muted-foreground">
                            Shop exclusive products from communities
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-auto">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Tag className="h-10 w-10 text-fresh-blue p-2 bg-fresh-blue/10 rounded-full" />
                        <div>
                          <h3 className="font-medium">Sell Your Products</h3>
                          <p className="text-sm text-muted-foreground">
                            Create and sell to your audience
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-auto">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center">
              <Button variant="outline" className="gap-2">
                <ShoppingBag className="h-4 w-4" /> Go to My Store
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Promotions;
