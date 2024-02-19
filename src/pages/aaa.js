import React, { useState } from 'react';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('zaaval')
    .min(8, 'Bagadaa 8')
    .max(25, 'Ihdee 25')
    .matches(/^[A-Z]{2}\d{8}$/, 'mongol id card'),
  password: Yup.string()
    .required('zaaval')
    .min(8, 'Bagadaa 8')
    .max(25, 'Ihdee 25')
    .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})((?=.*[A-Z]){1}).*$/, 'bagadaa 8 ihdee 25 bn. 1 temdegt 1 tom useg zaaval ashiglana'),
  matchPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'taarah ystoi')
    .required('confirm'),
});

export default function Index() {
  const [errors, setErrors] = useState({});
  const [pass, setPass] = useState(true);
  const [matchpass, setMatchPass] = useState(true);
  const [showIcons, setShowIcons] = useState(true);
  const [showIcons2, setShowIcons2] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate(
        {
          username: e.target.username.value,
          password: e.target.password.value,
          matchPassword: e.target.matchPassword.value,
        },
        { abortEarly: false }
      )
      .then(() => {
        console.log('success');
        alert('congrats');
        setErrors({});
      })
      .catch((err) => {
        console.log(err.message);
        setErrors(
          err.inner.reduce((acc, error) => {
            acc[error.path] = error.message;
            return acc;
          }, {})
        );
      });
  };

  const showPass = () => {
    setPass(!pass);
  };
  const showMatchPass = () => {
    setMatchPass(!matchpass);
  };

  const hidePass = () => {
    setPass(!pass);
  };
  const hideMatchPass = () => {
    setMatchPass(!pass);
  };
  const toggleIcon = () => {
    setShowIcons((prevShowIcons) => !prevShowIcons);
  };
  const toggleIcon2 = () => {
    setShowIcons2((prevShowIcons2) => !prevShowIcons2);
  };

  return (
    <div className="bg">
      <form className="form" onSubmit={handleSubmit}>
        <div className="head">
          <h1 className="headline">Registration</h1>
        </div>
        <div className="inputs">
          <div className="user">
            <input
              className={`input ${errors.username ? 'error' : ''}`}
              placeholder="Username (format: AA12345678)"
              type="text"
              name="username"
              required
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="pass">
            <input
              className={`input ${errors.password ? 'error' : ''}`}
              placeholder="Password"
              type={pass ? 'password' : 'text'}
              name="password"
              required
            />
            <div className="icontoggle" onClick={toggleIcon}>
              {showIcons ? <Icon icon="ci:hide" onClick={showPass} className="icon" /> : <Icon icon="ci:show" onClick={hidePass} className="icon2" />}
            </div>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="match-pass">
            <input
              className={`input ${errors.matchPassword ? 'error' : ''}`}
              placeholder="Match Password"
              type={matchpass ? 'password' : 'text'}
              name="matchPassword"
              required
            />
            <div className="icontoggle" onClick={toggleIcon2}>
              {showIcons2 ? (
                <Icon icon="ci:hide" onClick={showMatchPass} className="icon" />
              ) : (
                <Icon icon="ci:show" onClick={hideMatchPass} className="icon2" />
              )}
            </div>
            {errors.matchPassword && <span className="error">{errors.matchPassword}</span>}
          </div>
          <div className="checkbox1">
            <input type="checkbox" className="checkbox" />
            <p className="remember">Remember Me</p>
          </div>
        </div>
        <div className="button">
          <button className="log">Log In</button>
        </div>
      </form>
    </div>
  );
}

{
  /* username required
              8 aas urt 25aas baga mongol register
              urdaa2 usegtei arda 8
    password 
               8 aas urt 25aas baga8 1 temdegttei dor hayj 1 tom usegtei 
              regex
              yup
              eye 
    match paswrod
    checkbox
    button 
    window alert congrats */
}
