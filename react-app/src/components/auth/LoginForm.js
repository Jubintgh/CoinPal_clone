import './Login.css'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/my/wallet' />;
  }

  return (
    <form className={"login_page"} onSubmit={onLogin}>
      <div >
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <img id='navbar__logo' src='https://user-images.githubusercontent.com/73211975/127380259-8872d61e-851a-4aa5-8152-baec2618e00d.png' alt='logo' />

      <div className='login__container'>
      <div className='field_container'>
        <label className='login_label' htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          className='login_input'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='field_container'>
        <label className='login_label' htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          className='login_input'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button className="login_btn" type='submit'>Login</button>
        <span>or</span>
        <button className="signup_btn" onClick={() => window.location.href='/sign-up'}>Sign Up </button>
      </div>
    </form>
  );
};

export default LoginForm;
