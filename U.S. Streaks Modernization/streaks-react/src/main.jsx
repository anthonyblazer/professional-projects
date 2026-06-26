/**
 * main.jsx
 * 
 * Main hub for the App since this is where vanilla JS is used to inject the App into the DOM. Additionally,
 * React Router is used in order to allow React to adjust the URL and site contents dynamically.
 * 
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Content from './content/Content'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/access/monitoring/streaks/">
      <Content />
    </BrowserRouter>
  </StrictMode>,
)
