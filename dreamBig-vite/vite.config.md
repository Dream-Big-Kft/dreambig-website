# Vite Configuration Documentation

This document explains the Vite configuration settings for the SafeGuardLondon project.

## Configuration Overview

The `vite.config.ts` file configures the build tool (Vite) for our React application, defining how the project is built, served, and optimized.

## Settings Breakdown

### 1. Plugins
```typescript
plugins: [react()]
```
- **Purpose**: Enables React support in Vite
- **What it does**: Transforms JSX, enables Fast Refresh (hot reload), and optimizes React components
- **Why needed**: Required for React applications to work properly

### 2. Path Resolution & Aliases
```typescript
resolve: {
  alias: {
    "@": path.resolve(import.meta.dirname, "client", "src"),
    "@assets": path.resolve(import.meta.dirname, "attached_assets"),
  },
}
```
- **Purpose**: Creates shortcuts for importing files
- **`@` alias**: Maps to `client/src/` directory
  - Instead of: `import Component from '../../../components/Component'`
  - Use: `import Component from '@/components/Component'`
- **`@assets` alias**: Maps to `attached_assets/` directory
  - Instead of: `import image from '../../attached_assets/image.jpg'`
  - Use: `import image from '@assets/image.jpg'`
- **Benefits**: Cleaner imports, easier refactoring, better IDE support

### 3. Project Root
```typescript
root: path.resolve(import.meta.dirname, "client")
```
- **Purpose**: Sets the project root directory
- **What it does**: Tells Vite that the main application is in the `client/` folder
- **Why needed**: Our project has a `client/` subdirectory structure

### 4. Build Configuration
```typescript
build: {
  outDir: path.resolve(import.meta.dirname, "dist"),
  emptyOutDir: true,
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        ui: ['@radix-ui/react-slot', 'lucide-react'],
        router: ['wouter']
      }
    }
  },
}
```

#### Build Directory
- **`outDir`**: Output directory for built files (`dist/`)
- **`emptyOutDir`**: Clears the output directory before each build

#### Code Splitting (Manual Chunks)
- **Purpose**: Splits JavaScript into smaller, cacheable files
- **`vendor` chunk**: Contains React libraries (rarely change)
- **`ui` chunk**: Contains UI component libraries
- **`router` chunk**: Contains routing library
- **Benefits**: 
  - Faster loading (only download what's needed)
  - Better caching (unchanged chunks stay cached)
  - Smaller initial bundle size

### 5. Development Server
```typescript
server: {
  port: 3000,
  open: true,
}
```
- **`port: 3000`**: Runs development server on port 3000
- **`open: true`**: Automatically opens browser when server starts
- **Purpose**: Local development experience

## Performance Benefits

### Code Splitting Results
After build, you'll see separate files:
- `vendor-DbAb9B2p.js` (141.25 kB) - React libraries
- `ui-nqykKXtX.js` (12.74 kB) - UI components  
- `router-D1kzvWnk.js` (4.89 kB) - Router
- `index-UG_GvSVx.js` (53.13 kB) - Main app code

### Why This Matters
1. **Faster Initial Load**: Users download smaller chunks
2. **Better Caching**: Libraries rarely change, so they stay cached
3. **Parallel Downloads**: Browser can download multiple chunks simultaneously
4. **Incremental Updates**: Only changed chunks need re-downloading

## File Structure Impact

```
SafeGuardLondon/
├── client/                 # Project root (set by vite)
│   ├── src/               # Source code (@ alias)
│   ├── public/            # Static assets
│   └── index.html         # Entry point
├── attached_assets/       # Images (@assets alias)
└── dist/                  # Build output
```

## Development vs Production

### Development Mode (`npm run dev`)
- Uses development server on port 3000
- Hot module replacement (instant updates)
- Source maps for debugging
- No minification

### Production Mode (`npm run build`)
- Creates optimized files in `dist/`
- Code splitting enabled
- Minification and compression
- Tree shaking (removes unused code)

## Common Modifications

### Adding New Aliases
```typescript
alias: {
  "@": path.resolve(import.meta.dirname, "client", "src"),
  "@assets": path.resolve(import.meta.dirname, "attached_assets"),
  "@components": path.resolve(import.meta.dirname, "client", "src", "components"),
}
```

### Changing Port
```typescript
server: {
  port: 8080,  // Change from 3000 to 8080
  open: true,
}
```

### Adding More Chunks
```typescript
manualChunks: {
  vendor: ['react', 'react-dom'],
  ui: ['@radix-ui/react-slot', 'lucide-react'],
  router: ['wouter'],
  utils: ['clsx', 'tailwind-merge'],  // New chunk
}
```

## Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically try the next available port.

### Build Errors
- Check that all imports use correct aliases
- Ensure all dependencies are installed
- Verify file paths are correct

### Performance Issues
- Monitor bundle sizes in build output
- Consider adding more manual chunks for large libraries
- Use `npm run build -- --analyze` to analyze bundle composition

