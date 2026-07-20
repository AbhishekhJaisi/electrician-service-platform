import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("vf_token"));
  const navigate = useNavigate();

  const login = async (username, password) => {
    const res = await api.login({ username, password });
    localStorage.setItem("vf_token", res.token);
    setToken(res.token);
    navigate("/admin/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("vf_token");
    setToken(null);
    navigate("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
