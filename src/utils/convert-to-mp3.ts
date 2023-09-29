import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export async function convertVideoToAudio(
  ffmpeg: FFmpeg,
  video: File,
  onProgress: (progress: number) => void
): Promise<File> {
  await ffmpeg.writeFile("input.mp4", await fetchFile(video));

  // ffmpeg.on("log", (log) => {
  //   console.log(log);
  // });

  ffmpeg.on("progress", (progress) => {
    const conversionProgress = Math.round(progress.progress * 100);
    onProgress(conversionProgress);
  });

  await ffmpeg.exec([
    "-i",
    "input.mp4",
    "-map",
    "0:a",
    "-b:a",
    "20k",
    "-acodec",
    "libmp3lame",
    "output.mp3"
  ]);

  const data = await ffmpeg.readFile("output.mp3");

  const audioFileName = video.name.replace(/\..+$/, ".mp3");

  const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
  const audioFile = new File([audioFileBlob], audioFileName, {
    type: "audio/mpeg"
  });

  return audioFile;
}
