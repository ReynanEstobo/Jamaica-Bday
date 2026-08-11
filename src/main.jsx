import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ImagePreloader from './components/ImagePreloader.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ImagePreloader>
      <App />
    </ImagePreloader>
  </React.StrictMode>,
)
