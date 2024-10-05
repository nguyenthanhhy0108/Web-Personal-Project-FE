
interface BannerProps {
  id: string; 
  title: string; 
  description: string;
  url: string
}


export default function Banner({id, title, description, url} : BannerProps) {

  function handleImgClick() {
    window.location.href = url
  }

  return (
    <div className="flex flex-col bg-white h-full w-auto object-cover py-6 lg:py-0 rounded-2xl dark:bg-gray-800 dark:text-white">
      <img
        className="rounded-2xl hover:cursor-pointer object-cover overflow-hidden"
        onClick={handleImgClick}
        src={`${process.env.NEXT_PUBLIC_DOMAIN}/notification/banners/image/${id}`}
        alt="Banner"
      />
      <div className="text-black text-2xl font-semibold mx-auto dark:text-white">
        {title}
      </div>
      <div className="text-black mx-auto dark:text-white">
        {description}
      </div>
      <div className="text-blue-600 mx-auto hover:text-blue-900 dark:text-white">
        <a href={url}>More Informations...</a>
      </div>
    </div>
  )
}
