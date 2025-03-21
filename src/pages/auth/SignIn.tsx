
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setIsLoading(true);
      await signIn(email, password);
      // No need to navigate, the auth state change will trigger a redirect
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      // The user will be redirected to Google's sign-in page
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="glass-panel w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-muted-foreground mt-2">Welcome back to Influensta</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password"
                  className="text-sm text-accent hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute border-t border-muted w-full"></div>
              <span className="relative bg-background px-2 text-xs text-muted-foreground">OR</span>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            
            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-accent hover:underline font-medium">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
