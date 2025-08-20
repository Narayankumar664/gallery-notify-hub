import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, Camera, Shield, AlertCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock gallery images
const mockImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1418065460487-3d7063de14fd?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=300&h=300&fit=crop"
];

type PermissionState = 'denied' | 'granted' | 'prompt';

const Gallery = () => {
  const [permissionState, setPermissionState] = useState<PermissionState>('prompt');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();

  const requestGalleryPermission = async () => {
    setIsLoading(true);
    
    // Simulate permission request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate 80% chance of granting permission
    const granted = Math.random() > 0.2;
    
    if (granted) {
      setPermissionState('granted');
      setImages(mockImages);
      toast({
        title: "Gallery Access Granted",
        description: "You can now view your photos in the gallery.",
      });
    } else {
      setPermissionState('denied');
      toast({
        title: "Gallery Access Denied",
        description: "Gallery access is required to view your photos.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const retryPermission = () => {
    setPermissionState('prompt');
  };

  if (permissionState === 'prompt') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-elevation-2">
          <Image className="w-12 h-12 text-white" />
        </div>
        
        <div className="space-y-3 max-w-md">
          <h2 className="text-2xl font-semibold text-foreground">Access Your Gallery</h2>
          <p className="text-muted-foreground">
            To view your photos, we need permission to access your device gallery. 
            Your privacy is important to us - photos are only displayed locally.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-secondary-container/50 px-4 py-2 rounded-full">
          <Shield className="w-4 h-4" />
          <span>Secure & Private</span>
        </div>

        <Button 
          onClick={requestGalleryPermission}
          disabled={isLoading}
          className="bg-gradient-primary hover:opacity-90 text-white shadow-elevation-2 transition-smooth px-8"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Requesting Access...
            </>
          ) : (
            <>
              <Camera className="w-4 h-4 mr-2" />
              Grant Gallery Access
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
          <h2 className="text-2xl font-semibold text-foreground">Gallery Access Denied</h2>
          <p className="text-muted-foreground">
            We couldn't access your gallery. To view your photos, please grant permission when prompted.
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
          <h2 className="text-2xl font-semibold text-foreground">Your Gallery</h2>
          <p className="text-muted-foreground">Beautiful moments captured</p>
        </div>
        <Badge variant="secondary" className="bg-primary-container text-primary-container-foreground">
          {images.length} Photos
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Card 
            key={index} 
            className="aspect-square overflow-hidden group cursor-pointer hover:shadow-elevation-2 transition-smooth border-0 bg-card/50 backdrop-blur-sm"
          >
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={`Gallery photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;