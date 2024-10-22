'use client';

import ScreenAlert from '@/components/ScreenAlert';
import { saveContract } from '@/utils/ContractServices';
import { getURL } from '@/utils/GeneralServices';
import { classToPDF } from '@/utils/PdfServices';
import { getRelevantCars } from '@/utils/SearchService';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface VehicleInformation {
  brandName: string | null;
  vehicleName: string | null;
  price: string | null;
}

export default function ActualDeposite({
  customerInformation,
  paymentSuccess,
  setPaymentSuccess,
}: {
  customerInformation: any;
  paymentSuccess: boolean;
  setPaymentSuccess: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentTime, setCurrentTime] = useState('');
  const [isError, setIsError] = useState(false);
  const [vehicleInformation, setVehicleInformation] =
    useState<VehicleInformation>({
      brandName: null,
      vehicleName: null,
      price: null,
    });

  const router = useRouter();

  useEffect(() => {
    const urlParams = getURL();
    const brandName = urlParams.searchParams.get('brandName');
    const vehicleName = urlParams.searchParams.get('vehicleName');

    if (vehicleName != null && brandName != null) {
      const checkCar = async () => {
        const data = await getRelevantCars(vehicleName, brandName);
        console.log(data);
        if (data.code == 9999) {
          window.location.href = '/home';
        }
      };

      checkCar();

      setVehicleInformation({
        brandName: brandName,
        vehicleName: vehicleName,
        price: '0.1',
      });
    } else {
      router.push('/home');
    }

    const timer = setInterval(() => {
      const now = new Date();

      // Format date
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Combine date and time
      setCurrentTime(`${dateString}`);
    }, 1000);

    // Cleanup the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  const downloadPDF = async (direct: boolean) => {
    const blob = await classToPDF('.actual-receipt', direct);
    return blob;
  };

  if (paymentSuccess) {
    downloadPDF(true);

    const backgroundDownload = async () => {
      const pdfBlob = await downloadPDF(false);

      const formData = new FormData();
      if (pdfBlob != null) {
        formData.append('contractPdf', pdfBlob, 'receipt.pdf');
      }
      if (vehicleInformation.brandName) {
        formData.append('brandName', vehicleInformation.brandName);
      }
      if (vehicleInformation.vehicleName) {
        formData.append('vehicleName', vehicleInformation.vehicleName);
      }
      if (vehicleInformation.price) {
        formData.append('price', vehicleInformation.price);
      }
      formData.append('name', customerInformation.name);
      formData.append('address', customerInformation.address);
      formData.append('phoneNumber', customerInformation.phoneNumber);
      formData.append('email', customerInformation.email);
      formData.append('gender', customerInformation.gender);
      formData.append('dateOfBirth', customerInformation.birthday);
      formData.append('idCardNumber', customerInformation.idCard);

      formData.forEach((value, key) => {
        console.log(key + ', ' + value);
      });
      saveContract(formData);
    };

    backgroundDownload();

    setPaymentSuccess(false);
  }

  return (
    <div className='flex-grow flex-col lg:w-1/2 flex bg-gray-400 dark:bg-gray-700'>
      {isError && (
        <ScreenAlert
          status='error'
          title='Error'
          content='You have provided insufficient information!'
          isOpened={isError}
          setIsOpened={setIsError}
        />
      )}
      <h1 className='text-5xl font-semibold flex mx-auto text-black dark:text-white mt-6'>
        Your Contract!
      </h1>
      <p className='font-medium text-lg lg:flex hidden text-white flex mx-auto pt-3 italic'>
        Please fill out your informations and progress payment and contract will
        be sent for you.
      </p>
      <div className='actual-receipt mx-auto flex flex-col gap-6 lg:w-3/4 w-[95%] my-6 border-2 border-gray-200 dark:border-gray-200 pb-3 bg-white text-black px-3'>
        <img
          src='/images/black-logo.png'
          className='mx-auto'
          alt='Receipt Image'
          width='200'
        />
        <div className='flex justify-between'>
          <h1 className='font-bold'>UR-WJH Company</h1>
          <h1 className='font-bold'>Ho Chi Minh City</h1>
        </div>
        <div className='flex justify-center text-3xl font-bold'>
          Vehicle Deposite
        </div>
        <div className='gap-0'>
          <h2 className='font-semibold'>Customer informations</h2>
          <div className='pt-3'>
            <table className='table-auto w-full text-left mx-auto'>
              <tbody>
                <tr className='bg-gray-200'>
                  <td className='p-2 font-bold'>Name:</td>
                  <td className='p-2 break-words max-w-xs'>
                    {customerInformation.name}
                  </td>
                </tr>
                <tr>
                  <td className='p-2 font-bold'>Address:</td>
                  <td className='p-2 break-words max-w-xs'>
                    {customerInformation.address}
                  </td>
                </tr>
                <tr className='bg-gray-200'>
                  <td className='p-2 font-bold'>Phone number:</td>
                  <td className='p-2 break-words max-w-xs'>
                    {customerInformation.phoneNumber}
                  </td>
                </tr>
                <tr>
                  <td className='p-2 font-bold'>Email:</td>
                  <td className='p-2 break-words max-w-xs'>
                    {customerInformation.email}
                  </td>
                </tr>
                <tr className='bg-gray-200'>
                  <td className='p-2 font-bold'>ID Card:</td>
                  <td className='p-2 break-words max-w-xs'>
                    {customerInformation.idCard}
                  </td>
                </tr>
                <tr className=''>
                  <td className='p-2 font-bold'>Gender:</td>
                  <td className='p-2 break-words max-w-xs'>
                    {customerInformation.gender}
                  </td>
                </tr>
                <tr className='bg-gray-200'>
                  <td className='p-2 font-bold'>Birthday:</td>
                  <td className='p-2 break-words max-w-xs'>
                    {customerInformation.birthday}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='gap-0'>
          <h2 className='font-semibold'>Vehicle informations</h2>
          <div className='pt-3'>
            <table className='table-auto w-full text-left'>
              <tbody>
                <tr className='bg-gray-200'>
                  <td className='p-2 font-bold'>Vehicle Name:</td>
                  <td className='p-2 break-words max-w-xs'>
                    {vehicleInformation.vehicleName}
                  </td>
                </tr>
                <tr>
                  <td className='p-2 font-bold'>Brand Name:</td>
                  <td className='p-2 break-words max-w-xs'>
                    {vehicleInformation.brandName?.toUpperCase()}
                  </td>
                </tr>
                <tr className='bg-gray-200'>
                  <td className='p-2 font-bold'>Price:</td>
                  <td className='p-2 break-words max-w-xs'>
                    ${vehicleInformation.price}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='gap-0'>
          <h2 className='font-semibold'>Confirmation</h2>
          <div className='italic'>
            UR-WJH has received your deposit. Please proceed with the payment in
            the next step to complete the process.
          </div>
        </div>
        <div className='flex flex-col ml-auto'>
          <h1 className='mx-auto'>{currentTime}</h1>
          <h2 className='mx-auto text-2xl my-6'>Won Jeong Hee</h2>
          <h1 className='font-bold mx-auto'>UR-WJH CEO.</h1>
        </div>
      </div>
      {/* <button
        className='p-3 bg-green-500 hover:bg-green-600'
        onClick={downloadPDF}
      >
        Dowload PDF
      </button> */}
    </div>
  );
}
