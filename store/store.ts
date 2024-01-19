import { atom, selector } from "recoil";

export const fileState = atom({
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
