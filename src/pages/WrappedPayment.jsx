import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from './Payment';


const promise = loadStripe('pk_test_51NJvBzSIWwbB0BpMUXKt7pndDsm0J9pG9lNfGJAYRIM9n7PfDPczGiDS70O53E2pku9u1UQoOPbcHTjTFVtUoG3C009pzFfYSL');

function WrappedPayment() {
  return (
    <>
        <Elements stripe={promise}>
            <Payment/>
        </Elements>
    </>
  )
}

export default WrappedPayment