import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b2cccf7b218c4728a17d7a2a46d799ba',
  appName: 'gallery-notify-hub',
  webDir: 'dist',
  server: {
    url: 'https://b2cccf7b-218c-4728-a17d-7a2a46d799ba.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#8B5CF6',
      showSpinner: false,
    }
  }
};

export default config;