// AuthContext.js
import { createContext, useContext, useState, setState } from 'react';

export const UserData = createContext({
  token: "",
  setToken: (new_token) => {},
})

export const useUserData = () => {
  return useContext(UserData);
};

export const UserDataProvider = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <UserData.Provider value={{ token, setToken }}>
      {children}
    </UserData.Provider>
  );
};

