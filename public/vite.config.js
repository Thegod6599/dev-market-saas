import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import svgr from 'vite-plugin-svgr';

const rawPort = process.env.PORT ?? '5173';
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) throw new Error(`Invalid PORT value: "${rawPort}"`);

const basePath = process.env.BASE_PATH ?? '/';
const componentSlugs = [
  'action-toolbar','activity-timeline','breadcrumbs-trail','buttons-action','buttons-icon','buttons-split',
  'calendar-schedule','cards-pricing','cards-profile','cards-resource','command-palette','data-table',
  'editorial-testimonial','empty-state','feature-grid','file-dropzone','floating-action-menu','footers-columns',
  'footers-simple','form-stepper','forms-contact','forms-search','hero-product','hero-split','kanban-board',
  'layouts-content','layouts-dashboard','logo-cloud','metric-strip','modal-dialog','navigation-modern',
  'navigation-stacked','notification-center','pagination','range-slider','segmented-control','tabs-panel',
  'toggle-settings','workspace-sidebar',
];

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' && process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({ root: path.resolve(import.meta.dirname, '..') }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) => m.devBanner()),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(import.meta.dirname, '..', 'attached_assets'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        app: path.resolve(import.meta.dirname, 'index.html'),
        actionButtonSetPreview: path.resolve(
          import.meta.dirname,
          'component-previews/buttons-action.html',
        ),
        ...Object.fromEntries(
          componentSlugs.map((slug) => [
            `${slug}Preview`,
            path.resolve(import.meta.dirname, 'component-previews', `${slug}.html`),
          ]),
        ),
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: { strict: true },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
