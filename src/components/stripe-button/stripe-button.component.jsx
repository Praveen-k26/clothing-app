import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100; //Stripe requires the price to shown in cents
    const publishableKey = 'pk_test_51H1cE0A0w8kbxnFFJGNOjvSF6W286njjJ4nF7Ct3WtzURGaG0ceOaptBA7DZwhAE4UxXmM5cGfzaYW6InjfyCIaY005wM2vHaT';

   const onToken = token => {
        console.log('token-->',token);//Here token is supposed to be passed to the backend to process the payment.
        alert('Payment Successful')
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name="Koru's Clothing Label"
            billingAddress
            shippingAddress
            // image='src/assets/pk.svg'
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />

    )
};

export default StripeCheckoutButton;