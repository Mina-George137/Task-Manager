import { createContext, useContext, useEffect,  useState } from "react";
import type { User, AuthResponse } from "../types";
/* eslint-disable react-refresh/only-export-components */

interface AuthContextValue {
  user: User | null;
  loginWithResponse: (res: AuthResponse) => void;
  logout: () => void;
  loading: boolean; 

}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const loginWithResponse = (res: AuthResponse) => {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginWithResponse, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

//This is just a shortcut so you don’t have to write useContext(AuthContext) everywhere.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
