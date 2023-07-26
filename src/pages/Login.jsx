import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import logo from "../images/AmazonLogo.png"
import {auth} from '../components/firebase'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState("");

  const signIn = e => {
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .then(auth => {
      if(auth){
        navigate('/');
      }
    })
    .catch(err => alert(err.message))
  }

  const register = e => {
    e.preventDefault();
    if(!email && !password){
      setMsg("*Enter your email and password for the new account and click on 'Create your Amazon Account' again*");
    }else{
      auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if(auth){
          navigate('/');
        }
      })
      .catch(err => alert(err.message))
    }

  }

  return (
    <div className='login'>
        <Link to='/'>
            <img src={logo} className='login__logo' alt='logo'/>
        </Link>
        <div className='login__container'>

          <h1>Sign In</h1>

          <form>
            <h5>E-mail</h5>
            <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
            <h5>Password</h5>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
            <p>
              By signing-in you agree to AMAZON FAKE
              CLONE conditions of Use & Sale. Please
              see our Privacy Notice, our Cookies Notice
              and our Interest-Based Ads Notice.
            </p>
            <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
            <p>{msg}</p>
          </form>

        </div>
    </div>
  );
}

export default Login;