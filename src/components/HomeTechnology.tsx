import VideoPlayer from "./VideoPlayer";

export default function HomeTechnology() {
  return (
    <div className="flex flex-col w-screen h-screen mb-80 px-3">
      <div className="flex mr-auto justify-center font-bold dark:text-white text-black p-6">
        <h1 className="lg:text-4xl text-2xl mt-12 flex">
          DISCOVER MODERN TECHNOLOGIES
        </h1>
      </div>
      <div className="grid grid-rows-2 grid-cols-2 gap-3 w-full h-full">
        <div className="row-span-2 bg-black">
          <VideoPlayer
            videoLink = "/videos/self-driving.mp4"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 w-full h-full">
          <div className="bg-black">
            <VideoPlayer
              videoLink = "/videos/awd.mp4"
            />
          </div>

          <div className="bg-black">
            <VideoPlayer
              videoLink = "/videos/interior.mp4"
            />
          </div>
        </div>

        <div className="bg-black">
          <VideoPlayer
            videoLink = "/videos/hybrid.mp4"
          />
        </div>
      </div>     
    </div>
  )
}
