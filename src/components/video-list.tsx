"use client";

import { IVideo, VideoContextType } from "@/@types/types.video";
import { VideoContext } from "@/context/video-context";
import { api } from "@/lib/axios";
import loadFFmpeg from "@/lib/ffmpeg";
import { convertVideoToAudio } from "@/utils/convert-to-mp3";
import { formatBytes } from "@/utils/format-byte";
import { formatVideoLength } from "@/utils/format-video-length";
import { CheckCircle, Loader2, X } from "lucide-react";
import { createRef, useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const Videolist: React.FC = () => {
  const { videos, updateVideoById, removeVideoById } = useContext(
    VideoContext
  ) as VideoContextType;
  const [videoRefs, setVideoRefs] = useState<{
    [videoId: string]: React.RefObject<HTMLVideoElement>;
  }>({});

  async function handleLoadedMetadata(videoId: string) {
    const videoRef = videoRefs[videoId];
    if (!videoRef.current) return;

    const videoRefCurrent = videoRef.current;
    const video = videos.find((video) => video.id === videoId);

    updateVideoById(videoId, { duration: videoRefCurrent.duration });

    if (!video) return;

    const ffmpegInstance = await loadFFmpeg();
    const audioFile = await convertVideoToAudio(
      ffmpegInstance,
      video.file,
      (progress) => {
        updateVideoById(videoId, {
          progress
        });
      }
    );

    const data = new FormData();
    data.append("file", audioFile);

    await api.post("/videos/upload", data);

    // TODO:
    // tratar retorno da api
    // se der sucesso coloca isUploaded = true
    // se der erro coloca isUploadError = true para possibilidade de reprocessamento

    updateVideoById(videoId, { isUploaded: true });
  }

  useEffect(() => {
    const createVideoRefs = () => {
      const refs: { [videoId: string]: React.RefObject<HTMLVideoElement> } = {};
      videos.forEach((video) => {
        refs[video.id] = createRef<HTMLVideoElement>();
      });
      return refs;
    };

    setVideoRefs(createVideoRefs());
  }, [videos]);

  return (
    <div>
      {videos && videos.length > 0 && (
        <div className="border text-sm">
          {videos.map((video: IVideo) => (
            <div
              key={video.id}
              className="flex w-full items-center gap-4 border-t p-4"
            >
              <label
                htmlFor={`video_${video.id}`}
                className="flex aspect-video w-36 items-center overflow-hidden rounded-md"
              >
                <video
                  ref={videoRefs[video.id]}
                  src={video.previewURL}
                  controls={false}
                  className="pointer-events-none inset-0"
                  id={`video_${video.id}`}
                  onLoadedMetadata={() => handleLoadedMetadata(video.id)}
                />
              </label>
              <div className="line-clamp-1 w-1/3">{video.title}</div>
              <div className="flex w-1/12 justify-center">
                {formatBytes(video.size)}
              </div>
              <div className="flex w-1/12 justify-center">
                {video.duration ? formatVideoLength(video.duration) : false}
              </div>
              {video.progress < 100 ? (
                <Progress
                  value={video.progress}
                  className="flex w-1/12 justify-center"
                />
              ) : (
                <div className="flex gap-2 text-emerald-500">
                  <CheckCircle size={20} />
                  Conversion complete
                </div>
              )}

              <div className="flex w-2/12 justify-center">
                {video.isUploaded ? (
                  <div className="flex gap-2 text-emerald-500">
                    <CheckCircle size={20} />
                    Video uploaded
                  </div>
                ) : video.progress >= 100 ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <div>... Waiting upload</div>
                )}
              </div>

              <div className="flex w-1/12 justify-center">
                <Button
                  variant="ghost"
                  className="h-12 w-12 rounded-full text-red-500 hover:bg-white/20"
                  onClick={() => removeVideoById(video.id)}
                >
                  <X />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videolist;
