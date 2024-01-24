import axios from "axios";
import { atom, selector } from "recoil";

export const fileState = atom<File | null>({
  key: "fileState",
  default: null,
});

export const fileTypeState = selector({
  key: "fileTypeState",
  get: ({ get }) => {
    const file = get(fileState);
    const fileType = file ? file.name.split(".").pop() : null;
    return fileType;
  },
});

export const profileIdState = atom<string | null>({
  key: "profileIdState",
  default: null,
});

export const outputDefaultFormatState = selector({
  key: "outputDefaultFormatState",
  get: async () => {
    const res = await axios.get("/api/get-output-default-formats");
    return res.data.outputDefaultFormats;
  }, //["mp4", "webm", "ogg"]
});

export const outputDefaultResolutionState = selector({
  key: "outputDefaultResolutionState",
  get: async () => {
    const res = await axios.get("/api/get-output-default-resolutions");
    return res.data.outputDefaultResolutions;
  }, //["480p", "720p", "1080p"]
});

export const videoTitleState = atom({
  key: "videoTitleState",
  default: "",
});

export const videoDescriptionState = atom({
  key: "videoDescriptionState",
  default: "",
});

export const videoFormatState = atom({
  key: "videoFormatState",
  default: ["mp4", "webm", "ogg"],
});

export const videoResolutionState = atom({
  key: "videoResolutionState",
  default: ["480p", "720p", "1080p"],
});
