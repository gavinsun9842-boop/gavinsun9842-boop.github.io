import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './premium.css'
import './interests.css'
import './future.css'
import './edge-map.css'
import { initScrollMemory } from './scrollMemory.js'

// 浏览器原生滚动恢复在 hash 路由下不可用：统一改为按历史条目记忆位置。
initScrollMemory()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
