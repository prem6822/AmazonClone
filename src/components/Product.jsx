import React from 'react'
import "./Product.css"
import { useStateValue } from './StateProvider';


function Product(props) {
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
                rating: props.rating,
                quantity: 1
            }
        })
  }

  return (
    <div className='product'>
        <div className="product_info">
            <p>{props.title}</p>
            <p className='product_price'>
                <strong>₹ </strong>
                <strong>{props.price}</strong>
            </p>
            <div className='product_rating'>
                {
                    Array(props.rating)
                    .fill()
                    .map((_)=>
                        <p>⭐️</p>
                    )
                }
            </div>
        </div>
        <img src={props.image} alt='product image'/>
        <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;