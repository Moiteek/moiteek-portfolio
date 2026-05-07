import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build configuration
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate source maps for debugging
    sourcemap: false,
    
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true, // Remove debugger statements
      },
    },
    
    // Chunk size warning limit (in kB)
    chunkSizeWarningLimit: 1000,
    
    // Rollup options for better optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting
        manualChunks: {
          // React and React DOM
          react: ['react', 'react-dom'],
          
          // Vendor libraries (if any)
          vendor: ['prop-types'],
        },
        
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
            return `media/[name]-[hash][ext]`
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `images/[name]-[hash][ext]`
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `fonts/[name]-[hash][ext]`
          }
          return `assets/[name]-[hash][ext]`
        },
        
        // Chunk file naming
        chunkFileNames: 'js/[name]-[hash].js',
        
        // Entry file naming
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
    
    // Target browsers
    target: 'es2015',
  },
  
  // Development server configuration
  server: {
    port: 3000,
    host: true, // Allow external connections
    open: true, // Open browser on start
    
    // CORS configuration
    cors: true,
    
    // Proxy configuration (if needed for API calls)
    proxy: {
      // Example: Proxy API calls to backend
      // '/api': {
      //   target: 'http://localhost:5000',
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  },
  
  // Path resolution
  resolve: {
    alias: {
      // Add path aliases for cleaner imports
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@context': resolve(__dirname, 'src/context'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
  
  // CSS configuration
  css: {
    // Enable PostCSS
    postcss: './postcss.config.js',
    
    // CSS modules configuration
    modules: {
      // CSS modules naming pattern
      localsConvention: 'camelCase',
    },
    
    // Dev sourcemaps for CSS
    devSourcemap: true,
  },
  
  // Environment variables
  define: {
    // Define global constants
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  
  // Optimization
  optimizeDeps: {
    // Include dependencies for optimization
    include: ['react', 'react-dom', 'prop-types'],
    
    // Exclude dependencies from optimization
    exclude: [],
  },
  
  // Public directory
  publicDir: 'public',
  
  // Base path (if deploying to subdirectory)
  base: '/',
  
  // Mode
  mode: process.env.NODE_ENV || 'development',
  
  // Clear screen on build
  clearScreen: true,
  
  // Configurations for different environments
  ...(process.env.NODE_ENV === 'production' && {
    // Production-specific optimizations
    build: {
      // More aggressive minification for production
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        mangle: {
          safari10: true,
        },
      },
    },
  }),
  
  ...(process.env.NODE_ENV === 'development' && {
    // Development-specific settings
    server: {
      hmr: {
        overlay: true,
      },
    },
  }),
})
