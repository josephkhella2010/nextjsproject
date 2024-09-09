/* "use client";

import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  user: null,
  token: null,
  setToken: () => {}
};

const AuthContext = createContext(defaultState);

function AuthProvider({ children }) {
  const [token, setToken] = useState(defaultState.token);

  useEffect(() => {
    //TODO set token
    const _token = localStorage.getItem("@library/token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user: null,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth }; */

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  user: null,
  token: null,
  setToken: () => {},
  logout: () => {}
};

const AuthContext = createContext(defaultState);

function AuthProvider({ children }) {
  const [token, setToken] = useState(defaultState.token);

  useEffect(() => {
    //TODO set token
    const _token = localStorage.getItem("@library/token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  function logout() {
    localStorage.removeItem("@library/token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user: null,
        setToken,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
/* */
