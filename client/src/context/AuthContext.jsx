import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  logOutRequest,
  verifyTokenRequest,
} from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider ");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // estadosi
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registerErrors, setRegisterErrors] = useState([]);
  const [loginErrors, setLoginErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // funciones
  const signUp = async (values) => {
    try {
      const res = await registerRequest(values);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setRegisterErrors(error.response.data);
      console.log(error.response);
    }
  };

  const login = async (values) => {
    try {
      const res = await loginRequest(values);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setLoginErrors(error.response.data);
      }
      setLoginErrors([error.response.data.message]);
      console.log(error.response);
    }
  };

  const logOut = async () => {
    try {
      const res = await logOutRequest();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  // use Effects
  useEffect(() => {
    if (registerErrors.length > 0) {
      const timer = setTimeout(() => {
        setRegisterErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registerErrors]);

  useEffect(() => {
    if (loginErrors.length > 0) {
      const timer = setTimeout(() => {
        setLoginErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loginErrors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }

        setLoading(true);
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        login,
        logOut,
        user,
        isAuthenticated,
        registerErrors,
        loginErrors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
