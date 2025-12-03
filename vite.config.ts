import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The '' third argument tells Vite to load all env vars, not just those starting with VITE_
  // This allows us to use 'API_KEY' directly from Vercel settings.
  // Fix: Use '.' instead of process.cwd() to avoid TS error 'Property cwd does not exist on type Process'
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // This is the CRITICAL fix for Vercel.
      // It takes the API_KEY from the server environment and 'bakes' it into the code
      // so 'process.env.API_KEY' works in the browser.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY),
    },
  };
});
