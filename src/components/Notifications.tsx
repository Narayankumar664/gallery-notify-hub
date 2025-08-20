import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Shield, AlertCircle, RefreshCw, MessageSquare, Mail, Calendar, Phone, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  app: string;
  time: string;
  icon: any;
  priority: 'high' | 'normal' | 'low';
};

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New Message',
    message: 'Hey, how are you doing today?',
    app: 'Messages',
    time: '2 min ago',
    icon: MessageSquare,
    priority: 'high'
  },
  {
    id: '2',
    title: 'Email Received',
    message: 'You have a new email from John Doe',
    app: 'Gmail',
    time: '15 min ago',
    icon: Mail,
    priority: 'normal'
  },
  {
    id: '3',
    title: 'Calendar Reminder',
    message: 'Meeting with team in 30 minutes',
    app: 'Calendar',
    time: '30 min ago',
    icon: Calendar,
    priority: 'high'
  },
  {
    id: '4',
    title: 'Missed Call',
    message: 'Missed call from Mom',
    app: 'Phone',
    time: '1 hour ago',
    icon: Phone,
    priority: 'normal'
  },
  {
    id: '5',
    title: 'App Update',
    message: 'Gallery Notify Hub has been updated',
    app: 'App Store',
    time: '2 hours ago',
    icon: Settings,
    priority: 'low'
  }
];

type PermissionState = 'denied' | 'granted' | 'prompt';

const Notifications = () => {
  const [permissionState, setPermissionState] = useState<PermissionState>('prompt');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { toast } = useToast();

  const requestNotificationPermission = async () => {
    setIsLoading(true);
    
    // Simulate permission request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate 70% chance of granting permission
    const granted = Math.random() > 0.3;
    
    if (granted) {
      setPermissionState('granted');
      setNotifications(mockNotifications);
      toast({
        title: "Notification Access Granted",
        description: "You can now view your recent notifications.",
      });
    } else {
      setPermissionState('denied');
      toast({
        title: "Notification Access Denied",
        description: "Please enable notification access in system settings.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const retryPermission = () => {
    setPermissionState('prompt');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'normal': return 'bg-primary text-primary-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  if (permissionState === 'prompt') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center shadow-elevation-2">
          <Bell className="w-12 h-12 text-white" />
        </div>
        
        <div className="space-y-3 max-w-md">
          <h2 className="text-2xl font-semibold text-foreground">Access Notifications</h2>
          <p className="text-muted-foreground">
            To view your recent notifications, please enable notification access in your system settings. 
            This helps you stay updated with important messages.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-secondary-container/50 px-4 py-2 rounded-full">
          <Shield className="w-4 h-4" />
          <span>Privacy Protected</span>
        </div>

        <Button 
          onClick={requestNotificationPermission}
          disabled={isLoading}
          className="bg-gradient-accent hover:opacity-90 text-white shadow-elevation-2 transition-smooth px-8"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Requesting Access...
            </>
          ) : (
            <>
              <Bell className="w-4 h-4 mr-2" />
              Enable Notification Access
            </>
          )}
        </Button>
      </div>
    );
  }

  if (permissionState === 'denied') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>
        
        <div className="space-y-3 max-w-md">
          <h2 className="text-2xl font-semibold text-foreground">Notification Access Denied</h2>
          <p className="text-muted-foreground">
            To view notifications, please go to System Settings → Apps → Gallery Notify Hub → Permissions and enable notification access.
          </p>
        </div>

        <Button 
          onClick={retryPermission}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Recent Notifications</h2>
          <p className="text-muted-foreground">Stay updated with your latest activity</p>
        </div>
        <Badge variant="secondary" className="bg-primary-container text-primary-container-foreground">
          {notifications.length} New
        </Badge>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <Card 
              key={notification.id} 
              className="p-4 hover:shadow-elevation-2 transition-smooth border-0 bg-card/50 backdrop-blur-sm cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary-container transition-smooth">
                  <IconComponent className="w-5 h-5 text-secondary-container-foreground group-hover:text-primary-container-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs px-2 py-1 ${getPriorityColor(notification.priority)}`}
                      >
                        {notification.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {notification.message}
                  </p>
                  
                  <span className="text-xs text-primary font-medium">
                    {notification.app}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;