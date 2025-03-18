
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Avatar } from '@/components/shared/Avatar';
import { Bell, Heart, MessageCircle, UserPlus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const notificationsData = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait=1',
      username: 'sarahjohnson',
    },
    content: 'liked your post',
    target: 'Sunset vibes. No filter needed when nature provides...',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'David Chen',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait=4',
      username: 'davidchen',
    },
    content: 'commented on your post',
    target: 'This is absolutely stunning! Where was this taken?',
    time: '15 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    user: {
      name: 'Michelle Lee',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait=3',
      username: 'michellelee',
    },
    content: 'started following you',
    time: '1 hour ago',
    read: true,
  },
  {
    id: '4',
    type: 'mention',
    user: {
      name: 'James Wilson',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait=5',
      username: 'jameswilson',
    },
    content: 'mentioned you in a comment',
    target: 'Hey @username, what camera do you use for these shots?',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'like',
    user: {
      name: 'Emily Parker',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait=6',
      username: 'emilyparker',
    },
    content: 'liked your post',
    target: 'Morning coffee and journaling - perfect start to the day...',
    time: '5 hours ago',
    read: true,
  },
];

const Notifications = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button variant="outline" size="sm">Mark all as read</Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
            <TabsTrigger value="follows">Follows</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0 space-y-4">
            {notificationsData.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-lg glass-panel flex items-start gap-3 transition-all ${
                  !notification.read ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : ''
                }`}
              >
                <Avatar 
                  src={notification.user.avatar} 
                  alt={notification.user.name}
                  size="md"
                  status={notification.type === 'follow' ? 'online' : undefined}
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">
                        <span>{notification.user.name}</span>{' '}
                        <span className="text-muted-foreground font-normal">{notification.content}</span>
                      </p>
                      
                      {notification.target && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          "{notification.target}"
                        </p>
                      )}
                      
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                    
                    {!notification.read && (
                      <div className="h-2 w-2 bg-indigo-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  {notification.type === 'like' && (
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                      <Heart className="h-5 w-5" />
                    </div>
                  )}
                  
                  {notification.type === 'comment' && (
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                  )}
                  
                  {notification.type === 'follow' && (
                    <Button variant="outline" size="sm">
                      Follow Back
                    </Button>
                  )}
                  
                  {notification.type === 'mention' && (
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                      <Star className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="mentions" className="mt-0">
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No mentions yet</h3>
              <p className="text-muted-foreground text-sm">
                When someone mentions you, you'll see it here.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="follows" className="mt-0">
            {notificationsData
              .filter(notification => notification.type === 'follow')
              .map(notification => (
                <div 
                  key={notification.id} 
                  className="p-4 rounded-lg glass-panel flex items-center gap-3 transition-all mb-4"
                >
                  <Avatar 
                    src={notification.user.avatar} 
                    alt={notification.user.name}
                    size="md"
                    status="online"
                  />
                  
                  <div className="flex-1">
                    <p className="font-medium">
                      <span>{notification.user.name}</span>{' '}
                      <span className="text-muted-foreground font-normal">{notification.content}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Follow Back
                  </Button>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notifications;
