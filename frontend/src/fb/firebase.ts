import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW5Ffp-SKH7a8nEIMGHS7sdsrgIgY6rG8",
  authDomain: "dnd-characters-da783.firebaseapp.com",
  projectId: "dnd-characters-da783",
  storageBucket: "dnd-characters-da783.appspot.com",
  messagingSenderId: "962589107532",
  appId: "1:962589107532:web:7d7970f4a7c60cbfe3dbe9",
  measurementId: "G-HMQNKWXWSQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const logout = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        sessionStorage.clearItem("Auth Token");
    }).catch((error) => {
      // An error happened.
      console.warn(error);
    });
}

export const useAuth = () => {
  return {user: sessionStorage.getItem("Auth Token")}
}

// export const getUser = () => {
onAuthStateChanged(auth, (user) => {
  if (user) {
    user.getIdToken().then(res => sessionStorage.setItem("Auth Token", res));

    // GO TO FIRESTORE, GET ALL USER INFORMATION AND SET IT

  } else {
    sessionStorage.removeItem("Auth Token");
  }
});