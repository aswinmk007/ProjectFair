import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextAPI from './Contexts/ContextAPI.jsx'
import TokenAuth from './Contexts/TokenAuth.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ContextAPI>
     <TokenAuth>
        <BrowserRouter>
        <App />
        </BrowserRouter>
     </TokenAuth>
   </ContextAPI>
   
  </React.StrictMode>,
)
