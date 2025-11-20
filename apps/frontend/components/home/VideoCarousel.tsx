import { Marquee } from "../ui/marquee";

const videos = [
  {
    id: 1,
    src: "https://clipshortcdn.b-cdn.net/public_assets/videos_example/video_example_EN_2.mp4",
  },
  {
    id: 2,
    src: "https://clipshortcdn.b-cdn.net/public_assets/videos_example/video_example_EN_2.mp4",
  },
  {
    id: 3,
    src: "https://clipshortcdn.b-cdn.net/public_assets/videos_example/video_example_EN_2.mp4",
  },
  {
    id: 4,
    src: "https://clipshortcdn.b-cdn.net/public_assets/videos_example/video_example_EN_2.mp4",
  },
  {
    id: 5,
    src: "https://clipshortcdn.b-cdn.net/public_assets/videos_example/video_example_EN_2.mp4",
  },
  {
    id: 6,
    src: "https://clipshortcdn.b-cdn.net/public_assets/videos_example/video_example_EN_2.mp4",
  },
];

export const VideoCarousel = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {videos.map((video) => (
          <video
            key={video.id}
            src={video.src}
            width="300"
            autoPlay
            muted
            loop
            className="rounded-lg"
          ></video>
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
    </div>
  );
};
