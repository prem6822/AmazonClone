import React from 'react'
import './SearchProduct.css'
import { useStateValue } from './StateProvider';
import "./SearchProduct.css"

function SearchProduct(props) {
 const [{basket},dispatch] = useStateValue();
  function addToBasket(){
    dispatch(
        {
            type:'ADD_TO_BASKET',
            item:{
                id: props.id,
                title: props.title,
                image: props.image,
                price: props.price,
                rating: props.rating
            }
        })
  }
  return (
    <div className='search_product'>
        <img src={props.image} alt='product image'/>
        <div className="search_product_info">
            <p className='search_product_title'>{props.title}</p>
            <p className='search_product_price'>
                <strong>₹ </strong>
                <strong>{props.price}</strong>
            </p>
            <div className='search_product_rating'>
                {
                    Array(props.rating)
                    .fill()
                    .map((_)=>
                        <p>⭐️</p>
                    )
                }
            </div>
            <button onClick={addToBasket}> Add to Basket</button>
        </div>
    </div>
  )
}

export default SearchProduct