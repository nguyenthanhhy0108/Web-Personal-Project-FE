export default function Loading() {
  return (
    <div className='fixed inset-0 bg-gray-600 flex items-center justify-center z-50'>
      <div className='rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin'></div>
    </div>
  );
}
