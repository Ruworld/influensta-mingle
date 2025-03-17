
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { MessageList } from '@/components/messages/MessageList';
import { MessageItem } from '@/components/messages/MessageItem';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, Image, Smile } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Example data
const conversations = [
  {
    id: '1',
    username: 'Sarah Johnson',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=1',
    lastMessage: 'Hey! When are you free for that collab we talked about?',
    timestamp: 'Just now',
    unread: true,
    status: 'online' as const,
  },
  {
    id: '2',
    username: 'David Chen',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=4',
    lastMessage: 'The photos turned out amazing! Thank you!',
    timestamp: '2h ago',
    status: 'offline' as const,
  },
  {
    id: '3',
    username: 'Michelle Lee',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=3',
    lastMessage: 'Would love to feature you on my next podcast episode',
    timestamp: '5h ago',
    status: 'away' as const,
  },
  {
    id: '4',
    username: 'James Wilson',
    avatar: 'https://source.unsplash.com/random/100x100/?portrait=5',
    lastMessage: 'Are you going to the creator meetup next week?',
    timestamp: 'Yesterday',
    status: 'offline' as const,
  },
];

const messages = {
  '1': [
    {
      id: '1',
      content: 'Hey! When are you free for that collab we talked about?',
      timestamp: '10:32 AM',
      isOwn: false,
      sender: {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://source.unsplash.com/random/100x100/?portrait=1',
      },
      status: 'read' as const,
    },
    {
      id: '2',
      content: "Hi Sarah! I was thinking maybe next week? I'm pretty busy with client work this week.",
      timestamp: '10:35 AM',
      isOwn: true,
      status: 'read' as const,
    },
    {
      id: '3',
      content: 'Next week works perfectly! What day were you thinking?',
      timestamp: '10:36 AM',
      isOwn: false,
      sender: {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://source.unsplash.com/random/100x100/?portrait=1',
      },
      status: 'read' as const,
    },
    {
      id: '4',
      content: 'How about Tuesday afternoon? Around 2pm?',
      timestamp: '10:38 AM',
      isOwn: true,
      status: 'read' as const,
    },
    {
      id: '5',
      content: 'That works for me! Should I come to your studio or would you prefer to use mine?',
      timestamp: '10:40 AM',
      isOwn: false,
      sender: {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://source.unsplash.com/random/100x100/?portrait=1',
      },
      status: 'read' as const,
    },
  ],
};

const Messages = () => {
  const isMobile = useIsMobile();
  const [activeConversation, setActiveConversation] = useState('1');
  const [message, setMessage] = useState('');
  const [showConversationList, setShowConversationList] = useState(!isMobile);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Here we would normally add the message to the state and send it to an API
    console.log("Sending message:", message);
    setMessage('');
  };
  
  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
    if (isMobile) {
      setShowConversationList(false);
    }
  };
  
  return (
    <Layout>
      <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-6rem)] overflow-hidden rounded-lg glass-panel">
        <div className="h-full flex">
          {(showConversationList || !isMobile) && (
            <div className={`${isMobile ? 'w-full' : 'w-1/3'} h-full`}>
              <MessageList
                conversations={conversations}
                activeConversation={activeConversation}
                onSelectConversation={handleSelectConversation}
              />
            </div>
          )}
          
          {(!showConversationList || !isMobile) && (
            <div className={`${isMobile ? 'w-full' : 'w-2/3'} h-full flex flex-col`}>
              <div className="flex items-center p-4 border-b border-border gap-3">
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowConversationList(true)}
                  >
                    Back
                  </Button>
                )}
                
                <Avatar 
                  src={conversations.find(c => c.id === activeConversation)?.avatar || ''}
                  alt={conversations.find(c => c.id === activeConversation)?.username || ''}
                  status="online"
                />
                
                <div>
                  <h3 className="font-medium">
                    {conversations.find(c => c.id === activeConversation)?.username}
                  </h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {messages[activeConversation as keyof typeof messages]?.map((msg, index) => (
                  <MessageItem 
                    key={msg.id} 
                    message={msg} 
                    showAvatar={index === 0 || 
                      messages[activeConversation as keyof typeof messages][index - 1]?.isOwn !== 
                      messages[activeConversation as keyof typeof messages][index]?.isOwn}
                  />
                ))}
              </div>
              
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Image className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      className="pr-10"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    
                    <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      <Smile className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleSendMessage} 
                    size="icon"
                    className="bg-accent hover:bg-accent/90"
                    disabled={!message.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
