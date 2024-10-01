export default function HomeNotification() {
  return (
    <div className='flex flex-col h-screen w-screen'>
      <div className='flex mr-auto justify-center font-bold dark:text-white text-black p-6'>
        <h1 className='lg:text-4xl text-2xl mt-12 flex'>
          UP TO DATE WITH OUR NEWEST NOTIFICATIONS
        </h1>
      </div>
      <div className='grid grid-cols-2 h-full w-full gap-3'>
        <div className='row-span-2 bg-black'></div>
        <div className='flex bg-black'></div>
        <div className='flex bg-black'></div>
      </div>
    </div>
  );
}
