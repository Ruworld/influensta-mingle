
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Store, 
  ShoppingBag, 
  Plus, 
  Package, 
  BarChart3, 
  Settings,
  Tag,
  DollarSign,
  Truck,
  FileText,
  ShoppingCart,
  ArrowUpRight,
  EyeOff
} from 'lucide-react';

const MyStore = () => {
  // Sample product data
  const products = [
    {
      id: '1',
      name: 'Photography Basics Guide',
      price: '₹599',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000',
      type: 'digital',
      status: 'active',
      sales: 28,
      views: 145
    },
    {
      id: '2',
      name: 'Limited Edition Creator T-Shirt',
      price: '₹899',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=2187',
      type: 'physical',
      status: 'active',
      sales: 12,
      views: 89
    },
    {
      id: '3',
      name: 'Premium Lightroom Presets',
      price: '₹499',
      image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=2190',
      type: 'digital',
      status: 'draft',
      sales: 0,
      views: 0
    },
  ];

  return (
    <Layout>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Store</h1>
            <p className="text-muted-foreground">Manage your products and sales</p>
          </div>
          <Button className="bg-gradient-to-r from-fresh-blue to-fresh-teal gap-2">
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">₹24,529</div>
                  <p className="text-xs text-fresh-green flex items-center mt-1">
                    +12.5% from last month
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-fresh-blue/20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Products Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-fresh-green flex items-center mt-1">
                    +8 new orders this week
                  </p>
                </div>
                <Package className="h-8 w-8 text-fresh-blue/20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Store Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">358</div>
                  <p className="text-xs text-fresh-green flex items-center mt-1">
                    +24% from last week
                  </p>
                </div>
                <ShoppingBag className="h-8 w-8 text-fresh-blue/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="products" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-fresh-blue/20 data-[state=active]:text-fresh-blue">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product.id} className={`overflow-hidden hover:shadow-md transition-all ${product.status === 'draft' ? 'border-dashed opacity-70' : ''}`}>
                  <div className="h-40 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className={`${product.type === 'digital' ? 'bg-fresh-teal' : 'bg-fresh-indigo'} text-white`}>
                        {product.type === 'digital' ? 'Digital' : 'Physical'}
                      </Badge>
                    </div>
                    {product.status === 'draft' && (
                      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                        <Badge className="bg-muted-foreground text-white">
                          <EyeOff className="h-3 w-3 mr-1" /> Draft
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-medium mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-fresh-blue">{product.price}</span>
                      {product.status === 'active' && (
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{product.sales} sold</span>
                          <span>{product.views} views</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button className="w-full bg-fresh-blue text-white hover:bg-fresh-indigo">
                        Edit
                      </Button>
                      {product.status === 'draft' ? (
                        <Button variant="outline" className="flex-1">
                          Publish
                        </Button>
                      ) : (
                        <Button variant="outline" className="flex-1">
                          View
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed flex flex-col items-center justify-center p-6 text-center">
                <Plus className="h-12 w-12 text-muted-foreground p-2 border-2 border-dashed border-muted-foreground rounded-full mb-3" />
                <h3 className="font-medium mb-2">Add New Product</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create and sell digital or physical products to your audience
                </p>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button className="bg-fresh-teal text-white hover:bg-fresh-blue">
                    Digital
                  </Button>
                  <Button className="bg-fresh-indigo text-white hover:bg-fresh-blue">
                    Physical
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage your recent product orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000" alt="Product" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Photography Basics Guide</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Order #8294</span>
                          <span>•</span>
                          <span>2 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹599</div>
                      <Badge className="bg-fresh-teal text-white text-xs">Digital</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=2187" alt="Product" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Limited Edition Creator T-Shirt</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Order #8293</span>
                          <span>•</span>
                          <span>5 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹899</div>
                      <Badge className="bg-fresh-indigo text-white text-xs">Physical</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000" alt="Product" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Photography Basics Guide</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Order #8290</span>
                          <span>•</span>
                          <span>1 day ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹599</div>
                      <Badge className="bg-fresh-teal text-white text-xs">Digital</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline">Download CSV</Button>
                <Button className="bg-fresh-blue text-white hover:bg-fresh-indigo">
                  View All Orders
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-fresh-blue" />
                  Sales Analytics
                </CardTitle>
                <CardDescription>
                  View detailed analytics for your store
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md">
                    Track your sales, product performance, and customer data with our detailed analytics tools.
                  </p>
                  <Button className="bg-fresh-blue text-white hover:bg-fresh-indigo">
                    View Full Analytics <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-fresh-blue" />
                  Store Settings
                </CardTitle>
                <CardDescription>
                  Configure your store preferences and payment options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Store className="h-10 w-10 text-fresh-blue p-2 bg-fresh-blue/10 rounded-full" />
                          <div>
                            <h3 className="font-medium">Store Profile</h3>
                            <p className="text-sm text-muted-foreground">
                              Edit your store details
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-10 w-10 text-fresh-blue p-2 bg-fresh-blue/10 rounded-full" />
                          <div>
                            <h3 className="font-medium">Payment Methods</h3>
                            <p className="text-sm text-muted-foreground">
                              Configure payment options
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Truck className="h-10 w-10 text-fresh-blue p-2 bg-fresh-blue/10 rounded-full" />
                          <div>
                            <h3 className="font-medium">Shipping</h3>
                            <p className="text-sm text-muted-foreground">
                              Manage shipping options
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-10 w-10 text-fresh-blue p-2 bg-fresh-blue/10 rounded-full" />
                          <div>
                            <h3 className="font-medium">Legal Documents</h3>
                            <p className="text-sm text-muted-foreground">
                              Terms, privacy policy, etc.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Tag className="h-10 w-10 text-fresh-blue p-2 bg-fresh-blue/10 rounded-full" />
                          <div>
                            <h3 className="font-medium">Discounts & Coupons</h3>
                            <p className="text-sm text-muted-foreground">
                              Create special offers
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="h-10 w-10 text-fresh-blue p-2 bg-fresh-blue/10 rounded-full" />
                          <div>
                            <h3 className="font-medium">Checkout Settings</h3>
                            <p className="text-sm text-muted-foreground">
                              Customize your checkout
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${className}`}>
      {children}
    </span>
  );
};

export default MyStore;
