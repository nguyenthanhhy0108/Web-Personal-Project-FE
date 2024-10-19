"use client"

import ScreenAlert from "@/components/ScreenAlert";
import { ArrowForward } from "@mui/icons-material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function FormDeposite({setCustomerInformation, customerInformation}: 
  {
    setCustomerInformation: Dispatch<SetStateAction<{}>>,
    customerInformation: any
  }) {

  const [isError, setIsError] = useState(false);

  const handleNextStep = () => {
    if (
      customerInformation.name == null ||
      customerInformation.address == null ||
      customerInformation.phoneNumber == null ||
      customerInformation.email == null ||
      customerInformation.gender == null ||
      customerInformation.birthday == null
    ) {
      setIsError(true);
    }
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerInformation((prevState) => ({
      ...prevState,
      name: event.target.value.toUpperCase(),
    }));
  }

  const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerInformation((prevState) => ({
      ...prevState,
      address: event.target.value,
    }));
  }

  const handleChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerInformation((prevState) => ({
      ...prevState,
      phoneNumber: event.target.value,
    }));
  }

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerInformation((prevState) => ({
      ...prevState,
      email: event.target.value,
    }));
  }

  const handleChangeGender = (event: ChangeEvent<HTMLSelectElement>) => {
    setCustomerInformation((prevState) => ({
      ...prevState,
      gender: event.target.value,
    }));
  }

  const handleChangeBirthday = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomerInformation((prevState) => ({
      ...prevState,
      birthday: event.target.value,
    }));
  }

  return (
    <div className="w-1/2 h-full justify-center text-black relative items-center flex flex-col">
      {isError && 
        <ScreenAlert
          status="error"
          title="Error"
          content="You have provided insufficient information!"
          isOpened={isError}
          setIsOpened={setIsError}
        />
      }
      <div className="z-10 w-[70%] my-9 dark:text-white flex flex-col mx-auto bg-gray-100 dark:bg-gray-950 px-11 py-11 rounded-3xl border-2 border-gray-200 dark:border-black">
        <h1 className='text-5xl font-semibold'>Welcome!</h1>
        <p className='font-medium text-lg text-gray-600 pt-3 italic'>
          Please enter your details to order our product.
        </p>
        <form className="w-full flex-col flex pb-3 justify-center text-lg">
          <div
              className="mt-3 flex flex-col dark:text-white"
          >
            <label>
              Your name: 
            </label>
            <input
              type="text"
              onChange={handleChangeName}
              className="w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black"
              placeholder="Enter your name"
            />
          </div>
          <div
              className="mt-3 flex flex-col dark:text-white"
          >
            <label>
              Your address: 
            </label>
            <input
              type="text"
              onChange={handleChangeAddress}
              className="w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black"
              placeholder="Enter your address"
            />
          </div>
          <div
              className="mt-3 flex flex-col dark:text-white"
          >
            <label>
              Your phone number: 
            </label>
            <input
              onChange={handleChangePhoneNumber}
              max={10}
              maxLength={10}
              type="text"
              className="w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black"
              placeholder="Enter your phone number"
            />
          </div>
          <div
              className="mt-3 flex flex-col dark:text-white"
          >
            <label>
              Your email: 
            </label>
            <input
              onChange={handleChangeEmail}
              type="email"
              className="w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black"
              placeholder="Enter your email"
            />
          </div>
          <div
              className="mt-3 flex flex-col dark:text-white"
          >
            <label>
              Your gender: 
            </label>
            <select
              defaultValue=""
              onChange={handleChangeGender}
              className="w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black"
            >
              <option value="" disabled>Select your gender</option>
              <option
                className="w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black"
              >
                Male
              </option>
              <option
                className="w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black"
              >
                Female
              </option>
              <option
                className="w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black"
              >
                More ...
              </option>
            </select>
          </div>
          <div
              className="mt-3 flex flex-col dark:text-white"
          >
            <label>
              Your birthday: 
            </label>
            <input
              onChange={handleChangeBirthday}
              className="w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black"
              type="date"
            />
          </div>
        </form>
      </div>
      <button 
        onClick={handleNextStep}
        className="justify-center items-center flex text-xl p-4 hover:bg-blue-600 hover:scale-[1.05] transition-all duration-75 bg-blue-400 rounded-2xl">
        Next Steps
        <ArrowForward/>        
      </button>
    </div>
  )
}
