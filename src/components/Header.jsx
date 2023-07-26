import React, {useState} from 'react'
import logo from "../images/amazon-logo.png"
import "./Header.css"
import {Link} from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useStateValue } from './StateProvider';
import {auth} from "./firebase"

function Header() {
  const [{basket, user, searchInp}, dispatch] = useStateValue();
  const [curInp, setCurInp] = useState("");

  function changeInp(e){
    setCurInp(e.target.value);
    dispatch({
      type:'CHANGE_SEARCH_INP',
      item:{
          inp: curInp
      }
    })
  }

  function emptySearchInp(){
    dispatch({
      type: 'EMPTY_SEARCH_INP',
      inp: ""
    })
}

  const handleAuthentication = () => {
    if(user){
      auth.signOut();
    }
  }
  return (
    <nav className='header'>
      <Link to="/">
        <img onClick={emptySearchInp} className="header_logo" src={logo} alt=""/>
      </Link>
      <div className='header_search'>
        <input onChange={changeInp} type="text" className='header_searchInput' placeholder='Search with product name'/>
        <SearchIcon className="header_searchIcon" />
      </div> 
      <div className='header_nav'>
        <Link to={!user && "/login"} className="header_link">
          <div onClick={handleAuthentication} className='header_option'>
            <span className='header_option_line_1'>Hello {!user ? 'Guest' : user.email}</span>
            <span className='header_option_line_2'>{user?'Sign Out':'Sign In'}</span>
          </div>
        </Link>
        <Link to="/orders" className="header_link">
          <div className='header_option'>
            <span className='header_option_line_1'>Returns</span>
            <span className='header_option_line_2'>& Orders</span>
          </div>
        </Link>
        <Link to="/" className="header_link">
          <div className='header_option'>
            <span className='header_option_line_1'>Your</span>
            <span className='header_option_line_2'>Prime</span>
          </div>
        </Link>
        <Link to="/checkout" className="header_link">
          <div className='header_option_basket'>
            <ShoppingBasketIcon className='header_option_basket_img'/>
            <span className='header_option_line_2 basket_count'>{basket?.length}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;