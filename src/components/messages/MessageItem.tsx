
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '../shared/Avatar';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  sender?: {
    id: string;
    name: string;
    avatar: string;
  };
  status?: 'sent' | 'delivered' | 'read';
}

interface MessageItemProps {
  message: Message;
  showAvatar?: boolean;
}

export const MessageItem = ({ message, showAvatar = true }: MessageItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-end gap-2 mb-2 max-w-[85%] animate-slide-in",
        message.isOwn ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {showAvatar && !message.isOwn ? (
        <Avatar 
          src={message.sender?.avatar || ""} 
          alt={message.sender?.name || ""}
          size="sm"
          className="mb-1"
        />
      ) : (
        <div className="w-8" />
      )}
      
      <div>
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl",
            message.isOwn 
              ? "bg-accent text-white rounded-tr-none" 
              : "bg-muted rounded-tl-none"
          )}
        >
          <p className="text-sm whitespace-pre-line">{message.content}</p>
        </div>
        
        <div className={cn(
          "flex items-center mt-1",
          message.isOwn ? "justify-end" : "justify-start"
        )}>
          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
          
          {message.isOwn && message.status && (
            <span className="ml-1 text-xs text-muted-foreground">
              {message.status === 'read' ? '•• Read' : 
               message.status === 'delivered' ? '• Delivered' : '• Sent'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
