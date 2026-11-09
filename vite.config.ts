import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // prava-ui is npm-linked; its own node_modules has React 19, so force the site's React 18 copy.
  resolve: { dedupe: ["react", "react-dom"] },
  server: { fs: { allow: [".", "../prava-ui/dist"] } },
});
