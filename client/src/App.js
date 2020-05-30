import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import {NavBar} from './components/NavBar';
import {Loader} from './components/Loader';

function App() {
  const {token, login, logout, userId, ready, email} = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  if (!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuth, email
    }}>
      <Router>
        {isAuth && <NavBar/>}
        <div>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
