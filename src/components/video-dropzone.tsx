import { VideoContextType } from "@/@types/types.video";
import { VideoContext } from "@/context/video-context";
import { Ban, FileSymlink, Upload } from "lucide-react";
import { ReactNode, useContext } from "react";
import Dropzone from "react-dropzone";

const VideoDropzone: React.FC = () => {
  const { uploadVideos } = useContext(VideoContext) as VideoContextType;

  const acceptedFiles = {
    "video/mp4": [".mp4"]
  };

  function renderDragMessages(
    isDragAccept: boolean,
    isDragReject: boolean
  ): ReactNode {
    if (isDragAccept) {
      return (
        <div className="space-y-4 text-primary">
          <div className="flex justify-center">
            <FileSymlink size={40} />
          </div>
          <div>Drop your videos here...</div>
        </div>
      );
    }

    if (isDragReject) {
      return (
        <div className="space-y-4 text-destructive">
          <div className="flex justify-center">
            <Ban size={40} />
          </div>
          <div>Unsupported files...</div>
        </div>
      );
    }

    return (
      <div className="space-y-4 text-gray-600">
        <div className="flex justify-center">
          <Upload size={40} />
        </div>
        <div>Click, or drop videos here...</div>
      </div>
    );
  }

  return (
    <Dropzone onDrop={uploadVideos} accept={acceptedFiles}>
      {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => (
        <div
          {...getRootProps()}
          data-drag-accept={isDragAccept}
          data-drag-reject={isDragReject}
          className="flex h-52 cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-gray-600 shadow-sm data-[drag-accept=true]:border-primary data-[drag-reject=true]:border-destructive"
        >
          <input {...getInputProps()} />
          <div className="text-center text-2xl font-semibold">
            {renderDragMessages(isDragAccept, isDragReject)}
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default VideoDropzone;
