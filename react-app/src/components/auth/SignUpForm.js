import './SignUp.css'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { createWallet } from '../../store/wallet';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [img_url, setImgUrl] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, first_name, last_name, img_url));

      if (data) {
        setErrors(data)
      }
    }
    else {
      setErrors(['passwords don\'t match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  
  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  
  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const updateLastName = (e) => {
    setLastName(e.target.value)
  }
  const updateImgUrl = (e) => {
    setImgUrl(e.target.value)
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className={'form-container'}>
    <form className={'signup-page'} onSubmit={onSignUp}>
      <div className="errors__class">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label className='signup_input'>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label className='signup_input'>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <label className='signup_input'>First Name</label>
        <input
          type='text'
          name='first_name'
          onChange={updateFirstName}
          value={first_name}
          required={true}
        ></input>
      </div>
      <div>
        <label className='signup_input'>Last Name</label>
        <input
          type='text'
          name='last_name'
          onChange={updateLastName}
          value={last_name}
          required={true}
        ></input>
      </div>
      <div>
        <label className='signup_input'>Profile picture URL</label>
        <input
          type='text'
          name='img_url'
          onChange={updateImgUrl}
          value={img_url}
          required={true}
        ></input>
      </div>
      <div>
        <label className='signup_input'>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div>
        <label className='signup_input'>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className={'signup-btn'} type='submit'>Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpForm;
