
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  TrendingUp, 
  Plus, 
  Search, 
  ShoppingCart, 
  Tag, 
  Award,
  Heart,
  Star,
  ArrowRight,
  Zap
} from 'lucide-react';

const Merchandise = () => {
  // Sample merchandise data
  const products = [
    {
      id: '1',
      name: 'Limited Edition Creator Hoodie',
      price: '₹1,999',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2187',
      seller: 'Alex Morgan',
      sellerAvatar: 'https://i.pravatar.cc/150?img=1',
      rating: 4.8,
      reviews: 124,
      sold: 289,
      trending: true,
      fewLeft: true,
    },
    {
      id: '2',
      name: 'Photography Basics eBook',
      price: '₹499',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2187',
      seller: 'Jamie Chen',
      sellerAvatar: 'https://i.pravatar.cc/150?img=2',
      rating: 4.5,
      reviews: 57,
      sold: 412,
      trending: false,
      fewLeft: false,
    },
    {
      id: '3',
      name: 'Premium Lightroom Presets',
      price: '₹899',
      image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=2190',
      seller: 'Sarah Williams',
      sellerAvatar: 'https://i.pravatar.cc/150?img=4',
      rating: 4.9,
      reviews: 203,
      sold: 578,
      trending: true,
      fewLeft: false,
    },
    {
      id: '4',
      name: 'Creator Essentials T-Shirt',
      price: '₹799',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=2187',
      seller: 'Mike Johnson',
      sellerAvatar: 'https://i.pravatar.cc/150?img=5',
      rating: 4.3,
      reviews: 86,
      sold: 193,
      trending: false,
      fewLeft: true,
    },
  ];

  return (
    <Layout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Merchandise</h1>
          <Button className="bg-gradient-to-r from-vibrant-pink to-vibrant-purple gap-2">
            <Plus className="h-4 w-4" />
            Sell Your Merchandise
          </Button>
        </div>

        <div className="relative mb-6">
          <Input 
            placeholder="Search products..." 
            className="pl-10 bg-background border-vibrant-pink/20 focus-visible:ring-vibrant-pink/30"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all" className="data-[state=active]:bg-vibrant-pink/20 data-[state=active]:text-vibrant-pink">
              All Products
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-vibrant-pink/20 data-[state=active]:text-vibrant-pink">
              Trending
            </TabsTrigger>
            <TabsTrigger value="digital" className="data-[state=active]:bg-vibrant-pink/20 data-[state=active]:text-vibrant-pink">
              Digital
            </TabsTrigger>
            <TabsTrigger value="physical" className="data-[state=active]:bg-vibrant-pink/20 data-[state=active]:text-vibrant-pink">
              Physical
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="bg-gradient-to-br from-vibrant-pink/10 to-vibrant-purple/10 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-vibrant-pink" />
                <h3 className="font-semibold">Creator Marketplace</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Shop exclusive merchandise from your favorite creators or sell your own products to your audience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="border border-border rounded-lg overflow-hidden hover:border-vibrant-pink/30 transition-all duration-300 group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
                      {product.trending && (
                        <Badge className="bg-vibrant-pink text-white">
                          <Zap className="h-3 w-3 mr-1" /> Trending
                        </Badge>
                      )}
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-vibrant-pink hover:text-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {product.fewLeft && (
                      <div className="absolute bottom-3 left-3 bg-vibrant-orange/90 text-white text-xs px-2 py-1 rounded">
                        Only a few left!
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={product.sellerAvatar} alt={product.seller} className="h-6 w-6 rounded-full" />
                      <span className="text-sm text-muted-foreground">{product.seller}</span>
                    </div>
                    
                    <h3 className="font-medium mb-1 group-hover:text-vibrant-pink transition-colors">{product.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-vibrant-yellow fill-vibrant-yellow' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      <span className="text-xs text-muted-foreground ml-2">{product.sold} sold</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-lg text-vibrant-pink">{product.price}</span>
                      <Button size="sm" className="bg-vibrant-pink text-white hover:bg-vibrant-purple">
                        <ShoppingCart className="h-4 w-4 mr-1" /> Buy
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" className="w-full mt-4 text-vibrant-pink hover:bg-vibrant-pink/10">
              View More <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.filter(p => p.trending).map((product) => (
                <div 
                  key={product.id} 
                  className="border border-border rounded-lg overflow-hidden hover:border-vibrant-pink/30 transition-all duration-300 group"
                >
                  {/* Same product card structure as above */}
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
                      <Badge className="bg-vibrant-pink text-white">
                        <Zap className="h-3 w-3 mr-1" /> Trending
                      </Badge>
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-vibrant-pink hover:text-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {product.fewLeft && (
                      <div className="absolute bottom-3 left-3 bg-vibrant-orange/90 text-white text-xs px-2 py-1 rounded">
                        Only a few left!
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={product.sellerAvatar} alt={product.seller} className="h-6 w-6 rounded-full" />
                      <span className="text-sm text-muted-foreground">{product.seller}</span>
                    </div>
                    
                    <h3 className="font-medium mb-1 group-hover:text-vibrant-pink transition-colors">{product.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-vibrant-yellow fill-vibrant-yellow' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      <span className="text-xs text-muted-foreground ml-2">{product.sold} sold</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-lg text-vibrant-pink">{product.price}</span>
                      <Button size="sm" className="bg-vibrant-pink text-white hover:bg-vibrant-purple">
                        <ShoppingCart className="h-4 w-4 mr-1" /> Buy
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="digital" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4">
              <Tag className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">Digital Products Coming Soon</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                We're working on bringing digital products like e-books, courses, presets, and more to the platform.
              </p>
              <Button className="bg-vibrant-pink text-white hover:bg-vibrant-purple mt-2">Get Notified</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="physical" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">Physical Products Coming Soon</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                We're working on bringing physical products like merchandise, apparel, accessories, and more to the platform.
              </p>
              <Button className="bg-vibrant-pink text-white hover:bg-vibrant-purple mt-2">Get Notified</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Merchandise;
