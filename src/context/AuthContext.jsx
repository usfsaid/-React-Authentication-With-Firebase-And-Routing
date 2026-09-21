import { createContext, useContext, useEffect, useState } from "react";
// this method from firebase
// createUserWithEmailAndPassword =>
// onAuthStateChanged => change user
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import auth from "../firebase";

const AuthContext = createContext();

const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
const logout = () => {
  return signOut(auth);
};
const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};
const updateUserEmail = (email) => {
  return updateEmail(auth.currentUser, email);
};
const updateUserPassword = (password) => {
  return updatePassword(auth.currentUser, password);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubcribr = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubcribr();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        logout,
        login,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
