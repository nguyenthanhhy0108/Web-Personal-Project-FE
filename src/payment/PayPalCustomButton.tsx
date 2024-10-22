"use client"

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Dispatch, SetStateAction } from "react";

export default function PayPalCustomButton(
  {setPaymentSuccess}: {setPaymentSuccess: Dispatch<SetStateAction<boolean>>}
) {

  const initialOptions = {
    clientId: "AXE-8Ndsyto8XiTLDLw8KWjKzz4HOd0DWlO63-VIwvGND_H2Vn3Oraly2Zt0Stmy1DM42K7SQ3Cwdsj0",
    currency: "USD",
    intent: "capture"
  }

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount : {
            currency_code: "USD",
            value: "0.01"
          }
        }
      ]
    });
  }

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      setPaymentSuccess(true);
      //...
    })
  }

  return (
    <PayPalScriptProvider
      options={initialOptions}
    >
      <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </PayPalScriptProvider>
  )
}
