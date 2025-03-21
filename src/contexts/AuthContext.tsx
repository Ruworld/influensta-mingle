
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  is_verified: boolean;
  views_count?: number;
  post_impressions?: number;
  location?: string;
  company?: string;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, full_name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state changed:", event, newSession?.user?.id);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          await fetchProfile(newSession.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log("Initial session:", initialSession?.user?.id);
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        
        if (initialSession?.user) {
          await fetchProfile(initialSession.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        toast({
          title: "Error",
          description: "Failed to initialize authentication",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error.message);
        throw error;
      }
      console.log("Profile data:", data);
      setProfile(data as Profile);
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/auth/callback',
        }
      });
      
      if (error) throw error;
      
      // The user will be redirected to Google's OAuth page
      // After authentication, they'll be redirected back to our app
      
    } catch (error: any) {
      console.error('Error signing in with Google:', error.message);
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, full_name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
          },
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Please check your email to verify your account",
      });
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update the profile state with new data
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    profile,
    session,
    isLoading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
