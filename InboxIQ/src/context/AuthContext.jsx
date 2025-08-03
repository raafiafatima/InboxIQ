import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  // Sign In function

  const signIn = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });

      if (error) {
        console.log("Error in signing in: ", error);
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (error) {
      console.log("There has been an error", error);
      return { success: false, error: error.message };
    }
  };

  // Sign Out Function

  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("There has been an error signing out");
      return error
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, signIn, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
