import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Image, Bell, Shield, Smartphone, Palette, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [galleryEnabled, setGalleryEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: "Permissions",
      icon: Shield,
      items: [
        {
          title: "Gallery Access",
          description: "Allow access to device photos and media",
          value: galleryEnabled,
          onChange: setGalleryEnabled,
          icon: Image
        },
        {
          title: "Notification Access",
          description: "Show recent notifications from your device",
          value: notificationsEnabled,
          onChange: setNotificationsEnabled,
          icon: Bell
        }
      ]
    },
    {
      title: "Appearance",
      icon: Palette,
      items: [
        {
          title: "Dark Mode",
          description: "Switch between light and dark theme",
          value: darkMode,
          onChange: setDarkMode,
          icon: Smartphone
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="hover:bg-secondary-container transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your app preferences</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section) => {
          const SectionIcon = section.icon;
          return (
            <Card key={section.title} className="p-6 border-0 bg-card/50 backdrop-blur-sm shadow-elevation-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center">
                  <SectionIcon className="w-4 h-4 text-primary-container-foreground" />
                </div>
                <h2 className="text-lg font-medium text-foreground">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={item.title} className="flex items-center justify-between py-3">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-6 h-6 text-muted-foreground">
                          <ItemIcon className="w-full h-full" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}

        {/* App Info */}
        <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm shadow-elevation-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-secondary-container rounded-lg flex items-center justify-center">
              <Info className="w-4 h-4 text-secondary-container-foreground" />
            </div>
            <h2 className="text-lg font-medium text-foreground">About</h2>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">App Version</span>
              <span className="text-foreground font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Build</span>
              <span className="text-foreground font-medium">2024.1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platform</span>
              <span className="text-foreground font-medium">Web/Mobile</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Gallery Notify Hub - A beautiful Material 3 inspired app for managing your gallery and notifications.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;