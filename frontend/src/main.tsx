import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './screens/app.tsx'
// import Login from './screens/login.tsx'
import { AppStateType, initialState } from './types/state.ts'
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import AuthWrapper from './fb/auth.tsx'

export const AppState = createContext(({
  fullState:    initialState as AppStateType,
  setState:     (_: AppStateType) => {}
}))

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAW5Ffp-SKH7a8nEIMGHS7sdsrgIgY6rG8",
//   authDomain: "dnd-characters-da783.firebaseapp.com",
//   projectId: "dnd-characters-da783",
//   storageBucket: "dnd-characters-da783.appspot.com",
//   messagingSenderId: "962589107532",
//   appId: "1:962589107532:web:7d7970f4a7c60cbfe3dbe9",
//   measurementId: "G-HMQNKWXWSQ"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={
      <AuthWrapper>
        <App />
      </AuthWrapper>
      }
    />
  )
);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
      {/* <Login /> */}
    </React.StrictMode>
)
