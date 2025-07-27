import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [glsl()],
  base: '/AbhimanueYT.github.io/', // for GitHub Pages
}); 