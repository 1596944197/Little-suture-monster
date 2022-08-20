"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const vite_1 = require("vite");
const path_1 = __importDefault(require("path"));
exports.default = (0, vite_1.defineConfig)({
    resolve: {
        alias: {
            '@': path_1.default.resolve(__dirname, 'src')
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
function withDebug(config) {
    if (process.env.VSCODE_DEBUG) {
        if (!config.build)
            return {};
        config.build.sourcemap = true;
        config.plugins = (config.plugins || []).concat({
            name: 'electron-vite-debug',
            configResolved(config) {
                const index = config.plugins.findIndex(p => p.name === 'electron-main-watcher');
                // At present, Vite can only modify plugins in configResolved hook.
                config.plugins.splice(index, 1);
            },
        });
    }
    return config;
}
