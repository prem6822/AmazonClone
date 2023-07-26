
import React from 'react'
import {Link} from "react-router-dom"
import checkout_ad from '../images/checkout-image.jpeg'
import './Checkout.css'
import { useStateValue } from '../components/StateProvider';
import CheckoutProduct from '../components/CheckoutProduct';
import Subtotal from '../components/Subtotal';

function Checkout() {
  const [{basket, user},dispatch] = useStateValue();
  return (
    <>
      <div className='checkout'>
      <Link to='/accessories'>
        <img className="checkout_ad" src={checkout_ad} alt='advertisement'></img>
      </Link>
      </div>
      {
        basket?.length === 0 ?
        (<div>
          <h3 style={{margin: '10px'}}>Hello, {user?.email}</h3>
          <h2 className='checkout_title'>Your Shopping Basket is Empty!!</h2>
          <p className='checkoutEmpty'>You have no items in your basket. To buy one or more items, click "Add to Basket" next to the item.</p>
        </div>)
        :
        ( <div className='prod_subtotal'>
            <div className='checkout_products'>
              <h2 className='checkout_title'>Your Shopping Basket</h2>
              {
                basket.map(item => (
                  <CheckoutProduct
                    id = {item.id}
                    title= {item.title}
                    image = {item.image}
                    price = {item.price}
                    rating = {item.rating}
                    quantity = {1}
                  />
                ))
              }
            </div>
            <Subtotal/>
          </div>)
      }
    </>
    
  );
}

export default Checkout;