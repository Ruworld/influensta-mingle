
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { MobileNav } from './MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-vibrant-purple/10 via-background to-background dark:from-vibrant-pink/10 dark:via-background dark:to-background"></div>
      
      <Header />
      
      <div className="flex w-full">
        {!isMobile && <Sidebar />}
        
        <main className={`flex-1 min-h-screen transition-all duration-300 ease-in-out ${
          isMobile 
            ? 'pt-16 pb-20 px-0' 
            : 'pt-16 pb-6 md:pl-[240px] md:pr-[280px]'
        }`}>
          <div className={`container ${isMobile ? 'px-0' : 'px-4 md:px-8'} max-w-full md:max-w-3xl mx-auto animate-fade-in`}>
            {children}
          </div>
        </main>

        {!isMobile && <RightSidebar />}
      </div>
      
      {isMobile && <MobileNav />}
    </div>
  );
};
