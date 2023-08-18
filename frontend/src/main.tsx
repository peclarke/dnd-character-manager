import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './screens/app.tsx'
import './index.css'
import { AppStateType, initialState } from './types/state.ts'

export const AppState = createContext(({
  fullState:    initialState as AppStateType,
  setState:     (_: AppStateType) => {}
}))

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
)
