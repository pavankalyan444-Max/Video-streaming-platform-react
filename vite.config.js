import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectFolder = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(projectFolder, "index.html"),
        login: resolve(projectFolder, "login.html"),
        signup: resolve(projectFolder, "signup.html"),
        user: resolve(projectFolder, "user.html"),
        admin: resolve(projectFolder, "admin.html")
      }
    }
  }
});
