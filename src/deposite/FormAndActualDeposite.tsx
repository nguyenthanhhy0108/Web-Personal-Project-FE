'use client';

import { useState } from 'react';
import ActualDeposite from './ActualDeposite';
import FormDeposite from './FormDeposite';

export default function FormAndActualDeposite() {
  const [customerInformation, setCustomerInformation] = useState({});
  const [vehicleInformation, setVehicleInformation] = useState({});

  console.log(customerInformation);

  return (
    <div className='flex w-screen text-white'>
      <FormDeposite
        setCustomerInformation={setCustomerInformation}
        customerInformation={customerInformation}
      />
      <ActualDeposite customerInformation={customerInformation} />
    </div>
  );
}
