"use client";

import { IVideo, VideoContextType } from "@/@types/types.video";
import { PropsWithChildren, createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const VideoContext = createContext<VideoContextType | null>(null);

const VideoContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [videos, setVideos] = useState<IVideo[]>([]);

  function uploadVideos(data: File[]) {
    const videosList: IVideo[] = [];

    data.forEach((file: File) => {
      const url = URL.createObjectURL(file);
      const videoId = uuidv4();

      videosList.push({
        id: videoId,
        file,
        title: file.name,
        size: file.size,
        previewURL: url,
        progress: 0,
        isUploaded: false
      });
    });

    setVideos([...videos, ...videosList]);
  }

  function updateVideoById(videoId: string, updatedVideo: Partial<IVideo>) {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, ...updatedVideo } : video
      )
    );
  }

  function removeVideoById(videoId: string) {
    setVideos((prevVideos) =>
      prevVideos.filter((video) => video.id !== videoId)
    );
  }

  return (
    <VideoContext.Provider
      value={{ videos, uploadVideos, updateVideoById, removeVideoById }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
