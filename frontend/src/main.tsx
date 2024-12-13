import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='theme'>
      <Layout></Layout>
    </ThemeProvider>
  </StrictMode>,
)
