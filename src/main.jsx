import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Main from './routes/Main'
import Dashboard from './admin/Dashboard'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main/>
  </StrictMode>,
)
