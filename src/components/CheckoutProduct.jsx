import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';
import { useState, useEffect } from 'react';

function CheckoutProduct(props) {
  const [{basket},dispatch] = useStateValue();
  const [items,setItems] = useState(props.quantity)
  function increment(){
    setItems(prevItems=>prevItems+1);
    changeQuantity();
  }
  function decrement(){
    setItems(prevItems=>prevItems-1>0?prevItems-1:prevItems);
    changeQuantity();
  }
  function changeQuantity(){
    dispatch(
      {
        type: 'CHANGE_QUANTITY',
        id: props.id,
        quantity: items
      }
    )
  }
  function deleteFromBasket(){
    dispatch(
        {
            type:'REMOVE_FROM_BASKET',
            id: props.id
        })
  }
  useEffect(()=>{
    changeQuantity();
  })
  return (
    <div className='checkout_product'>
        <img src={props.image} alt='product image'/>
        <div className="checkout_product_info">
            <p className='checkout_product_title'>{props.title}</p>
            <p className='checkout_product_price'>
                <strong>₹ </strong>
                <strong>{props.price}</strong>
            </p>
            <div className='checkout_product_rating'>
                {
                    Array(props.rating)
                    .fill()
                    .map((_)=>
                        <p>⭐️</p>
                    )
                }
            </div>
            {props.hideButton ? <div className='quantity'>
                <h3 style={{marginTop: "10px"}}>{items} items</h3>
            </div>
            :
            <>
              <div className='quantity'>
                  <button onClick={increment} disabled={props.hideButton}>+</button>
                  <button> {items} </button>
                  <button onClick={decrement} disabled={props.hideButton}>-</button>
              </div>
              <button onClick={deleteFromBasket} disabled={props.hideButton}> Remove from Basket</button>
            </>
            
            }
        </div>
    </div>
  )
}

export default CheckoutProduct