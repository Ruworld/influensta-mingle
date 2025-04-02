
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import Reels from "./pages/Reels";
import Shorts from "./pages/Shorts";
import Settings from "./pages/Settings";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Notifications from "./pages/Notifications";
import Community from "./pages/Community";
import Merchandise from "./pages/Merchandise";
import Boost from "./pages/Boost";
import Promotions from "./pages/Promotions";
import MyStore from "./pages/MyStore";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import { useEffect } from "react";
import { App as CapacitorApp } from '@capacitor/app';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Capacitor app functionality
    try {
      // Initialize Capacitor app listeners for mobile
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
        } else {
          CapacitorApp.exitApp();
        }
      });
    } catch (error) {
      console.warn('Capacitor not available:', error);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Feed /></Layout>} />
              <Route path="/index" element={<Layout><Index /></Layout>} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout><Profile /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Layout><Messages /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/explore" element={<Layout><Explore /></Layout>} />
              <Route path="/reels" element={<Layout><Reels /></Layout>} />
              <Route path="/shorts" element={<Layout><Shorts /></Layout>} />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Layout><Settings /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <Layout><Notifications /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/community" element={<Layout><Community /></Layout>} />
              <Route path="/merchandise" element={<Layout><Merchandise /></Layout>} />
              <Route path="/promotions" element={<Layout><Promotions /></Layout>} />
              <Route path="/my-store" element={
                <ProtectedRoute>
                  <Layout><MyStore /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/boost" element={
                <ProtectedRoute>
                  <Layout><Boost /></Layout>
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
