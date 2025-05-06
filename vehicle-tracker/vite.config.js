import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // BU ÖNEMLİ! Build çıktısı Electron'da çalışsın diye
  plugins: [react()],
});
