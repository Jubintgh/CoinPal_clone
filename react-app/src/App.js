import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import Footer from './components/Footer/Footer';
import { authenticate } from './store/session';

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
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/my/wallet' exact={true}>
          <MyWallet />
        </Route>
        <Route path='/my/sendNrequest' exact={true}>
          <SendNrequestForm />
        </Route>
        <Route path='/my/transaction/history' exact={true}>
          <Activity />
        </Route>
        <Route path='/my/contacts' exact={true}>
          <MyContacts />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
