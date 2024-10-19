"use client"

import ScreenAlert from '@/components/ScreenAlert';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from "react";

export default function ActualDeposite({customerInformation} : {customerInformation: any}) {

  const [currentTime, setCurrentTime] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
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

  const downloadPDF = () => {

    if (
      customerInformation.name == null ||
      customerInformation.address == null ||
      customerInformation.phoneNumber == null ||
      customerInformation.email == null ||
      customerInformation.gender == null ||
      customerInformation.birthday == null
    ) {
      setIsError(true);
      return;
    }

    const capture = document.querySelector('.actual-receipt');
  
    if (capture instanceof HTMLElement) {
      html2canvas(capture, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm', 'a4');
  
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        // Get the aspect ratio of the canvas
        const canvasAspectRatio = canvas.width / canvas.height;
        const pdfWidth = pageWidth - 20; // Subtract margins (10mm on each side)
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio
  
        // Calculate the number of pages required
        const totalPages = Math.ceil(pdfHeight / pageHeight);
  
        // Define a footer space (e.g., 20mm)
        const footerSpace = 20;
  
        for (let i = 0; i < totalPages; i++) {
          const startY = i * (pageHeight - footerSpace); // Starting Y position for each page
  
          // Determine the height to draw based on the page index
          const imgY = startY * -1; // Adjust Y position for the image
          const imgHeight = Math.min(pageHeight - footerSpace, pdfHeight - startY); // Limit height to remaining content
  
          // Calculate the scaling factors
          const scaleX = pdfWidth / canvas.width;
          const scaleY = imgHeight / canvas.height;
  
          // Use the smaller scaling factor to maintain aspect ratio
          const scale = Math.min(scaleX, scaleY);
  
          // Calculate the new dimensions
          const newWidth = canvas.width * scale;
          const newHeight = canvas.height * scale;
  
          // Center the image horizontally
          const x = (pageWidth - newWidth) / 2;
  
          // Set a smaller font size
          doc.setFontSize(10); // Adjust the font size here
  
          // Add the image to the PDF with calculated dimensions
          doc.addImage(imgData, 'PNG', x, imgY, newWidth, newHeight);
        }
  
        doc.save('receipt.pdf');
      });
    }
  };

  return (
    <div className="flex-grow flex-col w-1/2 flex bg-gray-700">
      {isError && 
        <ScreenAlert
          status="error"
          title="Error"
          content="You have provided insufficient information!"
          isOpened={isError}
          setIsOpened={setIsError}
        />
      }
      <div
        className="actual-receipt my-auto mx-auto flex flex-col gap-6 w-3/4 border-2 border-gray-200 dark:border-gray-200 pb-3 bg-white text-black px-3"
      >
        <img src="/images/black-logo.png" className='mx-auto' alt="Receipt Image" width="200" />
        <div className="flex justify-between">
          <h1 className="font-bold">
            UR-WJH Company
          </h1>
          <h1 className="font-bold">
            Ho Chi Minh City
          </h1>
        </div>
        <div className="flex justify-center text-3xl font-bold">
          Vehicle Deposite
        </div>
        <div
          className="gap-0"
        >
          <h2
            className="font-semibold"
          >
            Customer informations
          </h2>
          <div className="pt-3">
          <table className="table-auto w-full text-left mx-auto">
            <tbody>
              <tr className="bg-gray-200">
                <td className="p-2 font-bold">Name:</td>
                <td className="p-2 break-words max-w-xs">{customerInformation.name}</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Address:</td>
                <td className="p-2 break-words max-w-xs">{customerInformation.address}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="p-2 font-bold">Phone number:</td>
                <td className="p-2 break-words max-w-xs">{customerInformation.phoneNumber}</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Email:</td>
                <td className="p-2 break-words max-w-xs">{customerInformation.email}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="p-2 font-bold">Gender:</td>
                <td className="p-2 break-words max-w-xs">{customerInformation.gender}</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Birthday:</td>
                <td className="p-2 break-words max-w-xs">{customerInformation.birthday}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        <div
          className="gap-0"
        >
          <h2
            className="font-semibold"
          >
            Vehicle informations
          </h2>
          <div className="pt-3">
          <table className="table-auto w-full text-left">
            <tbody>
              <tr className="bg-gray-200">
                <td className="p-2 font-bold">Vehicle Name:</td>
                <td className="p-2">Tesla Model S</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Brand Name:</td>
                <td className="p-2">Tesla</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="p-2 font-bold">Price:</td>
                <td className="p-2">$75,000</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        <div
          className="gap-0"
        >
          <h2
            className="font-semibold"
          >
            Confirmation
          </h2>
          <div className="italic">
          UR-WJH has received your deposit. Please proceed with the payment in the next step to complete the process.
        </div>
        </div>
        <div className="flex flex-col ml-auto">
          <h1 className="mx-auto">
            {currentTime}
          </h1>
          <h2 className="mx-auto text-2xl my-6">
            Won Jeong Hee
          </h2>
          <h1 className="font-bold mx-auto">
            UR-WJH CEO.
          </h1>
        </div>
      </div>
      <button
        className='p-3 bg-green-500 hover:bg-green-600'
        onClick={downloadPDF}
      >
        Dowload PDF
      </button>
    </div>
  )
}
