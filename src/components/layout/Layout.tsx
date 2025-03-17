
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-background to-background dark:from-gray-900/30 dark:via-background dark:to-background"></div>
      
      <Header />
      
      <div className="flex">
        {!isMobile && <Sidebar />}
        
        <main className="flex-1 pt-16 pb-20 md:pb-6 md:pl-[240px] min-h-screen transition-all duration-300 ease-in-out">
          <div className="container px-4 md:px-8 max-w-6xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
      
      {isMobile && <MobileNav />}
    </div>
  );
};
