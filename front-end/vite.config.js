import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://i10b310.p.ssafy.io',
        changeOrigin: true, // 호스트 헤더를 target URL로 변경
        secure: false, // https 사용시 SSL 검증을 끄는 옵션
        rewrite: (path) => path.replace(/^\/api/, '') // '/api'로 시작하는 경로를 타겟 URL에 맞게 재작성
      },
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
