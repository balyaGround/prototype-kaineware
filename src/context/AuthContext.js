import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
const [loading, setLoading] = useState(true);

 useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: data.nama || user.displayName || "Anonim",
            role: data.role,
            gudangAkses: data.gudangAkses || []
          });
        } else {
          setCurrentUser(null);
        }
      } catch {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  });

  return () => unsub();
}, []);

  const logout = () => auth.signOut();

  return (
    <AuthContext.Provider value={{ currentUser, logout, loading }}>

      {children}
    </AuthContext.Provider>
  );
};
