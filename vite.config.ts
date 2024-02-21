import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      pages: path.resolve(__dirname, 'src/pages'),
      stores: path.resolve(__dirname, 'src/stores'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.svg'],
  },
});
