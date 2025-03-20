
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/community" element={<Community />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route path="/boost" element={<Boost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
