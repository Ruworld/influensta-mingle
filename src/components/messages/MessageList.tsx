
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar } from '../shared/Avatar';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

interface MessageListProps {
  conversations: Conversation[];
  activeConversation?: string;
  onSelectConversation: (id: string) => void;
}

export const MessageList = ({ conversations, activeConversation, onSelectConversation }: MessageListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = searchQuery.trim()
    ? conversations.filter(
        (convo) => convo.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;
  
  return (
    <div className="w-full h-full flex flex-col border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search messages..."
            className="pl-9 bg-muted/50 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((convo) => (
            <div
              key={convo.id}
              className={cn(
                "p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border",
                activeConversation === convo.id && "bg-muted/70"
              )}
              onClick={() => onSelectConversation(convo.id)}
            >
              <Avatar
                src={convo.avatar}
                alt={convo.username}
                status={convo.status}
                className="flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-medium text-foreground truncate">{convo.username}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{convo.timestamp}</span>
                </div>
                
                <p className={cn(
                  "text-sm truncate mt-1",
                  convo.unread ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                  {convo.lastMessage}
                </p>
              </div>
              
              {convo.unread && (
                <div className="h-2.5 w-2.5 rounded-full bg-accent flex-shrink-0 mt-2"></div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
};
