import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
