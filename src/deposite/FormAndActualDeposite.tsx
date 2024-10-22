'use client';

import { getCookie } from '@/utils/Cookie';
import { getURL } from '@/utils/GeneralServices';
import { saveToLocalStorage } from '@/utils/LocalStorageServices';
import { getRelevantCars } from '@/utils/SearchService';
import { useEffect, useState } from 'react';
import ActualDeposite from './ActualDeposite';
import FormDeposite from './FormDeposite';

export default function FormAndActualDeposite() {
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [customerInformation, setCustomerInformation] = useState({});

  useEffect(() => {

    const token = getCookie("access-token");
    if (token != null) {
      const urlParams = getURL();
      const brandName = urlParams.searchParams.get("brandName");
      const vehicleName = urlParams.searchParams.get("vehicleName");
    
      if (vehicleName != null && brandName != null) {
    
        const checkCar = async () => {
          const data = await getRelevantCars(vehicleName, brandName); 
          console.log(data);
          if (data.code == 9999) {
            window.location.href = "/home"
          }
        }
    
        checkCar();
    
      } else {
        window.location.href = "/home"
      }
    } else {
      saveToLocalStorage("old-url", window.location.href);
      window.location.href = "/auth";
    }
  }, [])

  return (
    <div className='flex flex-col lg:flex-row w-screen text-white'>
      <FormDeposite
        setPaymentSuccess={setPaymentSuccess}
        setCustomerInformation={setCustomerInformation}
        customerInformation={customerInformation}
      />
      <ActualDeposite 
        customerInformation={customerInformation} 
        paymentSuccess={paymentSuccess}
        setPaymentSuccess={setPaymentSuccess}
      />
    </div>
  );
}
