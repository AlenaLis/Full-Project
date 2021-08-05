import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {login} from "../../services";

import './LogIn.scss';

const LogIn = () => {

  const [token, setToken] = useState(localStorage.getItem('token'))

  const [person, setPerson] = useState({
    inputForEmail: {
      value: '',
      type: '',
    },
    inputForPassword: {
      value: '',
      type: '',
    }
  });

  const isPerson = localStorage.getItem('users');

  useEffect(() => {
    if (!isPerson) {
      localStorage.setItem('users', JSON.stringify([]))
    }
  }, [])

  const setPersons = () => {
    login({
      inputForEmail: person.inputForEmail.value,
      inputForPassword: person.inputForPassword.value
    }).then(res => {
      setToken(res.token)
      localStorage.setItem('userId',  res.userId)
      localStorage.setItem('token', res.token)
      window.location.reload();
    })
  };

  const checkPerson = async () => {
    await setPersons()
  };

  const handleChange = (e, key) => {
    const {value, type} = e.target
    setPerson((prevState) => ({
      ...prevState,
      [key]: {
        value,
        type,
      },
    }))
  };

  return (
    <div>
      <div className="valid__content">
        <div>
          <h2 className="h2__text"> Log in to your account </h2>
        </div>
        <div>
          <form className="valid__form">
            <p>Email Address</p>
            <input
              className="input"
              value={person.inputForEmail.value}
              onChange={
                (e) => {
                  handleChange(e, 'inputForEmail')
                }}
              type="text"
              placeholder='Please, write your email'
            />
            <p>Password</p>
            <input
              className="input"
              value={person.inputForPassword.value}
              onChange={
                (e) => {
                  handleChange(e, 'inputForPassword')
                }}
              type="password"
              placeholder='Please, write your password'
            />
          </form>
        </div>
        <div className="valid__bottom">
          <div>
            <button
              className="button__valid"
              onClick={checkPerson}
            >
              Log in
            </button>
          </div>
          <div>
            <p> Don’t have a Times account?
              <Link to='/login/'>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
      {token && <Redirect to="/"/>}
    </div>
  );
}

export default LogIn;
