import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMemo } from "react";
import useStripeCustomer from "lib/stripe/useStripeCustomer";
import { getCurrentUser } from "lib/auth";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentCardSelectInnerProps {
  user: User;
}

const PaymentCardSelectInner = ({ user }: PaymentCardSelectInnerProps) => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "16px",
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    ["16px"]
  );

  const customer = useStripeCustomer(user?.email);

  console.log("customer", customer, user);

  return (
    <div>
      <CardElement options={options} />
    </div>
  );
};

const PaymentCardSelect = () => {
  const user = getCurrentUser();

  return (
    <Elements stripe={stripePromise}>
      <PaymentCardSelectInner user={user} />
    </Elements>
  );
};

export default PaymentCardSelect;
