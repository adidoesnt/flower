import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { Router } from "./components/Router.tsx";
import { AuthProvider } from "./components/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <AuthProvider>
        <Layout>
          <Router />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
