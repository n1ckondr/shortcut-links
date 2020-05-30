import {createContext} from 'react';

function nope() {
  // Empty function
}

export const AuthContext = createContext({
  token: null,
  userId: null,
  email: null,
  login: nope,
  logout: nope,
  isAuth: false
});
