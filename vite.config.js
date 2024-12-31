import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/booking-app-client/',  // Đảm bảo base được đặt ở đây
  plugins: [react()],
  optimizeDeps: {
    include: ['jwt-decode'],
  },
  server: {
    port: 3000, // Thay 3000 bằng số cổng bạn muốn sử dụng
  },
})