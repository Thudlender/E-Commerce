import { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";
export const AuthContext = createContext();
import app from "../configs/firebase.config";
import UserService from "../services/user.server";
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

const cookies = new Cookies();
const AuthProvider = ({ children }) => {
  const getUser = () => {
    const userInfo = cookies.get("user") || null;
    return userInfo;
  };
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
    return signOut(auth);
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
      email,
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
    getUser,
    isLoading,
  };

  //check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
        const { email } = currentUser;
        const response = await UserService.signJwt(email);
        if (response.data) {
          console.log(response.data);
          cookies.set("user", response.data);
        }
      } else {
        cookies.remove("user");
      }
      setIsLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

   export default AuthProvider;
