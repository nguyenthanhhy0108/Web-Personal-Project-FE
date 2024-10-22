'use client';

import PayPalCustomButton from '@/payment/PayPalCustomButton';
import { getURL } from '@/utils/GeneralServices';
import { getRelevantCars } from '@/utils/SearchService';
import { getProfileDetails } from '@/utils/UserService';
import { useRouter } from 'next/navigation';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function FormDeposite({
  setPaymentSuccess,
  setCustomerInformation,
  customerInformation,
}: {
  setPaymentSuccess: Dispatch<SetStateAction<boolean>>;
  setCustomerInformation: Dispatch<SetStateAction<{}>>;
  customerInformation: any;
}) {
  const [isError, setIsError] = useState(true);
  const router = useRouter();

  useEffect(() => {

    const fetchUserDetails = async () => {
      const data = await getProfileDetails();
      if (data) {
        setCustomerInformation((prevState) => ({
          ...prevState,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          birthday: data.dateOfBirth,
        }));
      }
    };

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
      fetchUserDetails();

    } else {
      window.location.href = "/home"
    }

  }, []);

  useEffect(() => {
    // console.log(customerInformation)
    checkInformation();
  }, [customerInformation])

  const checkInformation = () => {
    if (
      customerInformation.address == null || customerInformation.address == "" ||
      customerInformation.phoneNumber == null || customerInformation.phoneNumber == "" ||
      customerInformation.idCard == null || customerInformation.idCard == "" ||
      customerInformation.gender == null
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }

  const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerInformation((prevState) => ({
      ...prevState,
      address: event.target.value,
    }));
  };

  const handleChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerInformation((prevState) => ({
      ...prevState,
      phoneNumber: event.target.value,
    }));
  };
  
  const handleChangeIdCard = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerInformation((prevState) => ({
      ...prevState,
      idCard: event.target.value,
    }));
  };

  const handleChangeGender = (event: ChangeEvent<HTMLSelectElement>) => {
    setCustomerInformation((prevState) => ({
      ...prevState,
      gender: event.target.value,
    }));
  };

  return (
    <div className='lg:w-1/2 h-full justify-center text-black relative items-center flex flex-col'>
      {/* {isError && (
        <ScreenAlert
          status='error'
          title='Error'
          content='You have provided insufficient information!'
          isOpened={isError}
          setIsOpened={setIsError}
        />
      )} */}
      <div className='z-10 lg:w-[70%] w-[95%] my-9 dark:text-white flex flex-col mx-auto bg-gray-100 dark:bg-gray-950 px-11 py-11 rounded-3xl border-2 border-gray-200 dark:border-black'>
        <h1 className='text-5xl font-semibold'>Welcome!</h1>
        <p className='font-medium text-lg text-gray-600 pt-3 italic'>
          Please enter your details to order our product.
        </p>
        <form className='w-full flex-col flex pb-3 justify-center text-lg'>
          <div className='mt-3 flex flex-col dark:text-white'>
            <label>Your name:</label>
            <input
              type='text'
              disabled
              value={customerInformation.name}
              className='w-full border-2 bg-gray-400 border-gray-500 rounded-lg p-3 mt-3 dark:text-black'
              placeholder='Enter your name'
            />
          </div>
          <div className='mt-3 flex flex-col dark:text-white'>
            <label>Your email:</label>
            <input
              type='email'
              value={customerInformation.email}
              disabled
              className='w-full border-2 bg-gray-400 border-gray-500 rounded-lg p-3 mt-3 dark:text-black'
              placeholder='Enter your email'
            />
          </div>
          <div className='mt-3 flex flex-col dark:text-white'>
            <label>Your birthday:</label>
            <input
              disabled
              value={customerInformation.birthday}
              className='w-full border-2 bg-gray-400 border-gray-500 rounded-lg p-3 mt-3 dark:text-black'
            />
          </div>
          <div className='mt-3 flex flex-col dark:text-white'>
            <label>Your address:</label>
            <input
              type='text'
              onChange={handleChangeAddress}
              className='w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black'
              placeholder='Enter your address'
            />
          </div>
          <div className='mt-3 flex flex-col dark:text-white'>
            <label>Your phone number:</label>
            <input
              onChange={handleChangePhoneNumber}
              max={10}
              maxLength={10}
              type='text'
              className='w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black'
              placeholder='Enter your phone number'
            />
          </div>
          <div className='mt-3 flex flex-col dark:text-white'>
            <label>Your ID Card:</label>
            <input
              onChange={handleChangeIdCard}
              max={10}
              maxLength={10}
              type='text'
              className='w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black'
              placeholder='Enter your ID card number'
            />
          </div>
          <div className='mt-3 flex flex-col dark:text-white'>
            <label>Your gender:</label>
            <select
              defaultValue=''
              onChange={handleChangeGender}
              className='w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black'
            >
              <option value='' disabled>
                Select your gender
              </option>
              <option className='w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black'>
                Male
              </option>
              <option className='w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black'>
                Female
              </option>
              <option className='w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black'>
                More ...
              </option>
            </select>
          </div>
        </form>
      </div>
      {/* <button
        onClick={handleNextStep}
        className='justify-center items-center flex text-xl p-4 hover:bg-blue-600 hover:scale-[1.05] transition-all duration-75 bg-blue-400 rounded-2xl'
      >
        Next Steps
        <ArrowForward />
      </button> */}
      <div className={`w-1/2 ${isError ? "hidden" : ""}`}>
        <PayPalCustomButton
          setPaymentSuccess={setPaymentSuccess}
        />
      </div>
    </div>
  );
}
