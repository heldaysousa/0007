import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';
    import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
    import svgr from 'vite-plugin-svgr';

    export default defineConfig({
      plugins: [
        react({
          babel: {
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        }),
        ViteImageOptimizer({
          png: {
            quality: 85,
            compressionLevel: 9,
          },
          jpeg: {
            quality: 85,
          },
          webp: {
            lossless: true,
          },
        }),
        svgr()
      ],
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              'chart-vendor': ['recharts'],
              'motion-vendor': ['framer-motion'],
            },
          },
        },
        chunkSizeWarningLimit: 1000,
      },
      server: {
        port: 3000,
        open: true,
      },
    });
