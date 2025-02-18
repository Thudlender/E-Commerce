import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
import app from "../configs/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { set } from "react-hook-form";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth(app);
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    const logout = () => {
        return signOut(auth)
    };

    const signUpWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const signUpWithGithub = () => {
        const provider = new GithubAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const signUpWithFacebook = () => {
            const provider = new FacebookAuthProvider();
            return signInWithPopup(auth, provider);
    };

    const updateUserProfile = (displayName, photoURL, email) => {
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL,
            email
        });
    };

    const authInfo = {
      user,
      createUser,
      login,
      logout,
      signUpWithGoogle,
      signUpWithGithub,
      signUpWithFacebook,
      updateUserProfile,
      isLoading,
    };
    
    //check if user is logged in
    useEffect(() => {
        const unsubscripe = onAuthStateChanged(auth, (currentUser) => {
            setUser(user);
            if (currentUser) {
                setUser(currentUser);
                setIsLoading(false);
            }
            setIsLoading(false);
        });
        return () => {
            return unsubscripe();
        };
    }, [auth]);

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
   };

   export default AuthProvider;
