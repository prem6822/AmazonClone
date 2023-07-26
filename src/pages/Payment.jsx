import React, {useEffect, useState} from 'react'
import "./Payment.css"
import { Link } from 'react-router-dom'
import { useStateValue } from '../components/StateProvider'
import CheckoutProduct from '../components/CheckoutProduct';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import axios from './axios'
import { useNavigate } from 'react-router-dom';
import { db } from '../components/firebase';


function Payment() {

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [{basket, user}, dispatch] = useStateValue();

  let total = 0;
  basket.forEach(item => {
      let price = item.price
      let quantity = item.quantity
      total = total + price * quantity
  });

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(total!==0){
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            console.log(db);
            db.collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              });

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: 'EMPTY_BASKET'
            })
            navigate('/orders', {replace: true})
        })
    }
  }

  useEffect(()=>{
    if(total!==0){
        const getClientSecret = async () => {
          const response = await axios({
              method: 'post',
              url: `/payments/create?total=${total * 1}`
          });
          setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }
  },[JSON.stringify(basket)]);

  const handleChange = e => {

    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");

  }

  return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>Checkout (<Link to='/checkout'>{basket?.length} items</Link>)</h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {
                            basket.map(item => 
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                    quantity={item.quantity}
                                />
                            )
                        }
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payment__priceContainer'>
                                <h3><strong>Order Total: ₹ {total}</strong></h3>
                                <button disabled={processing || disabled || succeeded} type='submit'>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Payment