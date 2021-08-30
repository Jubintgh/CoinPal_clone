import './Login.css'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import './Login.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/my/home')
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
      <div class='login_background_img'>
    <form className="login_page" onSubmit={onLogin}>
      <h1 className='Title_text'>Welcome to CoinPal</h1>
      <div className='errors__class'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div className='login__container'>
      <div className='field_container'>
        <div className='icon_container'>
          <img id='login_icon' src='https://user-images.githubusercontent.com/73211975/127380259-8872d61e-851a-4aa5-8152-baec2618e00d.png' alt='logo' />
        </div>
        <div className='label_container'>
          <label className='login_label' htmlFor='email'>Email</label>
        </div>
        <div className='input_container'>
          <input
            name='email'
            type='text'
            className='login_input'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
      </div>
      <div className='field_container'>
        <div className='label_container'>
          <label className='login_label' htmlFor='password'>Password</label>
        </div>
        <div className='input_container'>
        <input
          name='password'
          type='password'
          className='login_input'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        </div>
      </div>
        <button className="login_btn" type='submit'>Login</button>
        <span>or</span>
        <button className="signup_btn" onClick={() => window.location.href='/sign-up'}>Sign Up </button>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
