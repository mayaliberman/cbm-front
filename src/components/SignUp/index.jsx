import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>

    <SignUpForm />
  </div>
);

const SignUpFormBase = (props) => {
  const [formState, getFormState] = useState({
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  });

  const { username, email, passwordOne, passwordTwo, error } = formState;
  const onSubmit = (event) => {
    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        getFormState({ ...formState });
        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        getFormState({ error });
      });

    event.preventDefault();
  };

  const onChange = (event) => {
    getFormState({ [event.target.name]: event.target.value });
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name='username'
        value={username}
        onChange={onChange}
        type='text'
        placeholder='Full Name'
      />
      <input
        name='email'
        value={email}
        onChange={onChange}
        type='text'
        placeholder='Email Address'
      />
      <input
        name='passwordOne'
        value={passwordOne}
        onChange={onChange}
        type='password'
        placeholder='Password'
      />
      <input
        name='passwordTwo'
        value={passwordTwo}
        onChange={onChange}
        type='password'
        placeholder='Confirm Password'
      />
      <button disabled={isInvalid} type='submit'>
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withFirebase(SignUpFormBase);
export default SignUpPage;

export { SignUpForm, SignUpLink };
