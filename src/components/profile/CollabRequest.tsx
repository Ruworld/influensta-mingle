
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Handshake,
  Send,
  X,
  CheckCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface CollabRequestProps {
  profileName: string;
  profileHandle: string;
}

export const CollabRequest = ({ profileName, profileHandle }: CollabRequestProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = () => {
    if (!projectTitle.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast.success('Collaboration request sent!', {
        description: `Your request to collaborate with @${profileHandle} has been sent.`,
      });
      
      // Reset form after 2 seconds of showing success
      setTimeout(() => {
        setIsSuccess(false);
        setMessage('');
        setProjectTitle('');
        setIsOpen(false);
      }, 2000);
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Handshake className="h-4 w-4" />
          Request Collaboration
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Collaborate with {profileName}</DialogTitle>
              <DialogDescription>
                Send a collaboration request to work together on a project.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="project-title" className="text-sm font-medium">
                  Project Title
                </label>
                <Input
                  id="project-title"
                  placeholder="Enter project title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Collaboration Details
                </label>
                <Textarea
                  id="message"
                  placeholder={`Hi @${profileHandle}, I'd like to collaborate with you on...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send Request
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center text-center">
            <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Request Sent!</h3>
            <p className="text-muted-foreground">
              Your collaboration request has been sent to {profileName}.
              We'll notify you when they respond.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
