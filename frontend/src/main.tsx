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

export const AppState = createContext(({
  fullState:    initialState as AppStateType,
  setState:     (_: AppStateType) => {}
}))

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={
//       <AuthWrapper>
//         <App />
//       </AuthWrapper>
//       }
//     >
//     <Route path="help" element={
//       <AuthWrapper>
//         {/* <Help /> */}
//       </AuthWrapper>
//       }
//     />
//     </Route>
//   )
// );

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


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
)
