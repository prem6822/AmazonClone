import React from 'react'
import "./Subtotal.css"
import { useStateValue } from './StateProvider'
import { useNavigate } from 'react-router-dom'

function Subtotal() {
    const [{basket, user},dispath] = useStateValue();
    const navigate = useNavigate();
    let total = 0;
    basket.forEach(item => {
        let price = item.price
        let quantity = item.quantity
        total = total + price * quantity
    });
    const handleProceed = e => {
      if(user){
        navigate('/payment');
      }else{
        navigate('/login');
      }
    }
    return (
      <div className='subtotal'>
         Subtotal ({basket.length} items): <strong> ₹ {total}</strong>
         <div className='subtotal_checkbox'>
            <input type='checkbox'/><small>This order contains a gift.</small>
         </div>
         <button onClick={handleProceed}>Proceed to checkout</button>
      </div>
    )
}

export default Subtotal;