import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './screens/app.tsx'
import { AppStateType, initialState } from './types/state.ts'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import AuthWrapper from './fb/auth.tsx'
import Help from './screens/help.tsx';
import ErrorElement from './screens/error.tsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const AppState = createContext(({
  fullState:    initialState as AppStateType,
  setState:     (_: AppStateType) => {}
}))

const router = createBrowserRouter([
  {
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/',
        element: <AuthWrapper><App /></AuthWrapper>
      },
      {
        path: '/help',
        element: <AuthWrapper><Help /></AuthWrapper>
      }
    ]
  } 
])

const theme = createTheme({
  palette: {
    primary: {
      main: "#d72c19",
      dark: "#d72c19",
      contrastText: "#fff"
    },
    secondary: {main: "#f6ddb6"},
    background: {default: "#fff"}
    // info: {main: "#fff", : "#fff"}
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
)
