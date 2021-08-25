import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import MyWallet from './components/DashBoard/MyWallet';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import SendNrequestForm from './components/Transaction/SendNrequest'
import Activity from './components/Activity/Activity'
import MyContacts from './components/Contacts/Contacts';
import Splash from './components/Splash/Splash'
import Footer from './components/Footer/Footer';
import { authenticate } from './store/session';
import Home from './components/Home/Home';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path='/users/:username' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/my/home' exact={true} >
          <Home/>
        </ProtectedRoute>
        <ProtectedRoute path='/my/wallet' exact={true}>
          <MyWallet />
        </ProtectedRoute>
        <ProtectedRoute path='/my/sendNrequest' exact={true}>
          <SendNrequestForm />
        </ProtectedRoute>
        <ProtectedRoute path='/my/transaction/history' exact={true}>
          <Activity />
        </ProtectedRoute>
        <ProtectedRoute path='/my/contacts' exact={true}>
          <MyContacts />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true} >
          <Splash/>
        </Route>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
