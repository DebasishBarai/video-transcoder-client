import {
  fileState,
  fileTypeState,
  videoDescriptionState,
  videoFormatState,
  videoResolutionState,
  videoTitleState,
  videoUploadProgressState,
  videoUploadingState,
} from "@/store/store";
import axios, { AxiosRequestConfig } from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export const useUploadVideo = () => {
  const [file, setFile] = useRecoilState(fileState);
  const fileType = useRecoilValue(fileTypeState);

  const title = useRecoilValue(videoTitleState);
  const description = useRecoilValue(videoDescriptionState);

  const formats = useRecoilValue(videoFormatState);
  const resolutions = useRecoilValue(videoResolutionState);

  const setUploading = useSetRecoilState(videoUploadingState);
  const setUploadProgress = useSetRecoilState(videoUploadProgressState);

  // const [uploadComplete, setUploadComplete] = useState(false);

  const cleanUp = () => {
    setFile(null);

    setUploading(false);
    setUploadProgress(0);
  };
  return async () => {
    setUploading(true);

    if (!file) {
      cleanUp();
      return;
    }

    //register video in the database
    const videoRes = await axios.post("/api/create-video", {
      title,
      description,
      fileType: `${fileType}`,
      transcodeFormats: formats,
      transcodeResolutions: resolutions,
    });

    if (videoRes.status != 200) {
      cleanUp();
      return;
    }

    console.log("create video route returned ", videoRes);

    const videoId = videoRes.data.videoId;

    //initiate multipart upload
    const initiateUploadResponse = await axios.post(
      "/api/aws/multipart-upload/initiate-multipart-upload",
      {
        videoId,
        fileType,
      },
    );

    if (initiateUploadResponse.status != 200) {
      cleanUp();
      return;
    }

    const uploadId = initiateUploadResponse.data.uploadId;
    console.log(uploadId);

    //get S3 presigned urls
    const presignedUrlResponse = await axios.post(
      "/api/aws/multipart-upload/put-multipart-presigned-urls",
      {
        videoId,
        fileType,
        uploadId,
      },
    );

    console.log(
      "put video presigned url route returned ",
      presignedUrlResponse,
    );

    if (presignedUrlResponse.status != 200) {
      cleanUp();
      return;
    }

    //save file to S3
    const options: AxiosRequestConfig = {
      headers: {
        "Content-Type": fileType,
      },
      // onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      //   const percentUploaded = Math.round(
      //     (progressEvent.loaded / progressEvent.total) * 100,
      //   );
      //
      //   // console.log("create video route returned ", percentUploaded);
      //   setUploadProgress(percentUploaded);
      // },
    };

    await axios.put(
      presignedUrlResponse.data.putObjectPreSignedUrl,
      file,
      options,
    );
    cleanUp();
    return;
  };
};
