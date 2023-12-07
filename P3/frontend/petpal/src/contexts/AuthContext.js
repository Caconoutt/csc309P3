// AuthContext.js
import { createContext, useContext, useState, setState, useEffect } from 'react';

export const UserData = createContext({
  token: "",
  setToken: (new_token) => {},
})

export const useUserData = () => {
  return useContext(UserData);
};

export const UserDataProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || ''
  })
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <UserData.Provider value={{ token, setToken }}>
      {children}
    </UserData.Provider>
  );
};
