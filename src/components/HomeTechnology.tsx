import { videoLinks } from '@/constants';
import VideoPlayer from './VideoPlayer';

export default function HomeTechnology() {
  return (
    <div>
      <div className='hidden lg:flex flex-col w-screen h-screen px-3'>
        <div className='flex mr-auto justify-center font-bold dark:text-white text-black p-6'>
          <h2 className='lg:text-4xl text-2xl mt-12 flex'>
            DISCOVER MODERN TECHNOLOGIES
          </h2>
        </div>
        <div className='hidden lg:grid lg:grid-rows-2 lg:grid-cols-2 gap-3 w-full h-full'>
          <div className='row-span-2 bg-black border-2 border-black rounded-3xl'>
            <VideoPlayer videoLink={videoLinks[0].url} />
          </div>

          <div className='grid grid-cols-2 gap-3 w-full h-full'>
            <div className='bg-black border-2 border-black rounded-3xl'>
              <VideoPlayer videoLink={videoLinks[1].url} />
            </div>

            <div className='bg-black border-2 border-black rounded-3xl'>
              <VideoPlayer videoLink={videoLinks[2].url} />
            </div>
          </div>

          <div className='bg-black border-2 border-black rounded-3xl'>
            <VideoPlayer videoLink={videoLinks[3].url} />
          </div>
        </div>
        <div className='flex justify-center p-3 pt-9'>
          <button
            title='Facebook Page'
            className='px-6 py-3 text-black border-2 border-gray-400 dark:border-none rounded-xl text-xl font-semibold bg-gray-300 dark:bg-white hover:scale-[1.05] transition-all duration-75 hover:bg-gray-200 hover:border-blue-600'
          >
            <a href='https://www.facebook.com/wonjeonghee.71/'>More...</a>
          </button>
        </div>
      </div>
      {/* Moblie */}
      <div className='lg:hidden flex flex-col'>
        <div className='flex mr-auto justify-center font-bold dark:text-white text-black p-6'>
          <h2 className='lg:text-4xl text-2xl mt-12 flex'>
            DISCOVER MODERN TECHNOLOGIES
          </h2>
        </div>
        <div className='lg:hidden flex flex-col gap-3 w-screen'>
          {
            videoLinks.map((videoInstance) => {
              return (
                <div 
                  key={videoInstance.id}
                  className='bg-black border-2 border-black rounded-3xl w-full min-h-[300px] h-[300px]'>
                  <VideoPlayer videoLink={videoInstance.url} />
                </div>
              );
            })
          }
        </div>
        <div className='lg:hidden flex justify-center p-3 pt-9'>
          <button
            type='button'
            title='Facebook Page'
            className='px-6 py-3 text-black border-2 border-gray-400 dark:border-none rounded-xl text-xl font-semibold bg-gray-300 dark:bg-white hover:scale-[1.05] transition-all duration-75 hover:bg-gray-200 hover:border-blue-600'
          >
            <a href='https://www.facebook.com/wonjeonghee.71/'>More...</a>
          </button>
        </div>
      </div>
    </div>
  );
}
