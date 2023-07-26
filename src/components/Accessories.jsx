import React from 'react'
import SearchProduct from './SearchProduct'
import mobileAccesories from "../MobileAccessories"
import "./Accessories.css"

function ret_prod(props){
    return (
        <SearchProduct 
            id={props.id}
            title={props.title}
            price={props.price}
            rating={props.rating}
            image={props.image}
        />
    )
}

function Accessories() {
  return (
    <>
        <div className='accessories'>
        {
            mobileAccesories.map(ret_prod)
        }
    </div>
    </>
  )
}

export default Accessories