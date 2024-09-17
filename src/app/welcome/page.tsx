import LoginOrRegister from '@/components/LoginOrRegister'

export default function page() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-white dark:bg-gray-900 text-black dark:text-white">
        <LoginOrRegister/>
      </div>
      <div className="hidden relative lg:flex h-full lg:w-1/2 items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-600 to-pink-500 rounded-full animate-bounce transition-all"></div>
        <div className='w-full h-1/2 bottom-0 backdrop-blur-lg bg-transparent absolute'></div>
      </div>
    </div>
  )
}
