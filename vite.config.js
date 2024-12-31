import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],
  optimizeDeps: {
    include: ['jwt-decode'],
    base: '/booking-app-client/',
  },
  server: {
    port: 3000, // Thay 3000 bằng số cổng bạn muốn sử dụng
  },
 
})

