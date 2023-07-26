import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Accessories from './components/Accessories';
import {auth} from "./components/firebase"
import { useStateValue } from './components/StateProvider';
import WrappedPayment from './pages/WrappedPayment';
import Orders from './pages/Orders';
import Header from './components/Header';
import AllSearchProducts from './components/AllSearchProducts';



function App() {

  const [{searchInp}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      }else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])

  return (
      <div className='app'>
        <Router>
          <Routes>
            <Route path='/allp' element={<AllSearchProducts/>}/>
            <Route path="/" element={<><Header/>{!searchInp ? <Home/> : <AllSearchProducts/>}</>} />
            <Route path="/checkout" element={<><Header />{!searchInp ? <Checkout/> : <AllSearchProducts/>}</>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/accessories" element={<><Header />{!searchInp ? <Accessories/> : <AllSearchProducts/>}</>} />
            <Route path="/payment" element={<><Header/>{!searchInp ? <WrappedPayment/> : <AllSearchProducts/>}</>}/>
            <Route path="/orders" element={<><Header/>{!searchInp ? <Orders/> : <AllSearchProducts/>}</>}/>
          </Routes>
        </Router>
      </div>
      
  );
}

export default App;
