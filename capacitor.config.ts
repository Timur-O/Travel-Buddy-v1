import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.timuroberhuber.travelbuddy',
  appName: 'travel-buddy',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
