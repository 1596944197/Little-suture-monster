/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Plugin,
  UserConfig,
  defineConfig,
} from 'vite';
import path from 'path';
import electron from 'vite-plugin-electron';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    // electron({
    //   main: {
    //     entry: './src/electron/main.ts',
    //     vite: withDebug({
    //       build: {
    //         outDir: 'dist/electron/main',
    //       },
    //     }),
    //   },
    //   preload: {
    //     input: {
    //       index: './src/electron/preload.tsx'
    //     },
    //     vite: {
    //       build: {
    //         sourcemap: 'inline',
    //         outDir: 'dist/electron/preload',
    //       }
    //     },
    //   }
    // })
  ]
});

function withDebug(config: UserConfig): UserConfig {
  if (process.env.VSCODE_DEBUG) {
    if (!config.build) return {};
    config.build.sourcemap = true;
    config.plugins = (config.plugins || []).concat({
      name: 'electron-vite-debug',
      configResolved(config) {
        const index = config.plugins.findIndex(p => p.name === 'electron-main-watcher');
        // At present, Vite can only modify plugins in configResolved hook.
        (config.plugins as Plugin[]).splice(index, 1);
      },
    });
  }
  return config;
}