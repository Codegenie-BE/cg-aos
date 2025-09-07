import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.js'],
  format: ['esm', 'iife'],
  globalName: 'cgAOS',     // -> globalThis.cgAOS = <exports>
  outDir: 'dist',
  sourcemap: true,
  minify: true,
  outExtension({ format }) {
    return format === 'iife' ? { js: '.global.js' } : { js: '.js' }
  },
  footer: {
    js: `
      // Expose as plain var for non-module demos
      var cgAOS = (globalThis.cgAOS && (
        globalThis.cgAOS.init ? globalThis.cgAOS :
        globalThis.cgAOS.default ?? globalThis.cgAOS.cgAOS
      )) || undefined;
    `
  }
})
