import { Outlet } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings, Image, Bell } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname === '/notifications' ? 'notifications' : 'gallery';

  const handleTabChange = (value: string) => {
    if (value === 'gallery') {
      navigate('/');
    } else {
      navigate('/notifications');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border/50 shadow-elevation-1">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Image className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Gallery Notify Hub</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="hover:bg-secondary-container transition-smooth"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {location.pathname === '/settings' ? (
          <Outlet />
        ) : (
          <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary-container/50 backdrop-blur-sm">
              <TabsTrigger 
                value="gallery" 
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth"
              >
                <Image className="w-4 h-4" />
                <span>Gallery</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notifications"
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth"
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery" className="mt-0">
              <Outlet />
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0">
              <Outlet />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Layout;