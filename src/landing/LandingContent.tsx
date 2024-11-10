import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function LandingContent() {
  const handleExplore = () => {
    window.location.href = '/home';
  };

  return (
    <div className='items-start flex flex-col justify-center text-4xl lg:text-6xl font-mono lg:ml-24 ml-10 gap-6'>
      <p>Dive into</p>
      <p>what you love!</p>
      <button
        title='Explore'
        type='button'
        onClick={handleExplore}
        className='bg-white text-black flex items-center justify-between rounded-r-full rounded-l-full gap-6 p-2 hover:scale-[1.05] duration-100 transition-all'
      >
        <p className='lg:text-3xl text-xl justify-center flex lg:pl-3 pl-1'>
          Explore the features
        </p>
        <div className='lg:w-12 lg:h-12 w-9 h-9 flex justify-center items-center p-3 bg-red-500 rounded-full ml-auto'>
          <ArrowForwardIcon />
        </div>
      </button>
    </div>
  );
}
