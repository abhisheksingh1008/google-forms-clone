"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";

const AuthContext = createContext({
  userName: "",
  email: "",
  image: "",
});

const AuthProvider = ({ children }) => {
  const { data: session } = useSession();
  // console.log(session);

  return (
    <AuthContext.Provider
      value={{
        userName: session?.user.name,
        email: session?.user.email,
        image: session?.user.image,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
