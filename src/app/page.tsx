"use client";

import VideoDropzone from "@/components/video-dropzone";
import Videolist from "@/components/video-list";

const Home: React.FC = () => {
  return (
    <div className="flex max-h-fit flex-col">
      <main className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-1 items-center justify-between">
          <span className="text-3xl font-bold">Upload</span>
        </div>
        <VideoDropzone />
        <Videolist />
      </main>
    </div>
  );
};

export default Home;
