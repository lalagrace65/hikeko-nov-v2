import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <UserContextProvider>
          <App />
          <Toaster />
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
