export interface IVideo {
  id: string;
  file: File;
  title: string;
  size: number;
  duration?: number;
  previewURL: string;
  progress: number;
  isUploaded: boolean;
}

export type VideoContextType = {
  videos: IVideo[];
  uploadVideos: (data: File[]) => void;
  updateVideoById: (videoId: string, updatedVideo: Partial<IVideo>) => void;
  removeVideoById: (videoId: string) => void;
};
