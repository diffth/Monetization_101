import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface CheckoutButtonProps {
  amount: string;
  onSuccess: (details: unknown) => void;
  onError: (err: unknown) => void;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ amount, onSuccess, onError }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div className="spinner" style={{ marginBottom: '10px' }}></div>
        <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>Loading PayPal...</span>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '350px', margin: '0 auto', zIndex: 10 }}>
      <PayPalButtons
        style={{ 
          layout: 'vertical', 
          color: 'gold', 
          shape: 'rect', 
          label: 'checkout',
          height: 45
        }}
        createOrder={(_, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: amount,
                },
                description: 'JobCV.ai Pro Lifetime Pass',
              },
            ],
          });
        }}
        onApprove={async (_, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            onSuccess(details);
          } else {
            console.error("Order context missing during approval");
          }
        }}
        onError={(err) => {
          onError(err);
        }}
      />
    </div>
  );
};
export default CheckoutButton;
