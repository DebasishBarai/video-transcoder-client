import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  outputDefaultFormatState,
  outputDefaultResolutionState,
  videoFormatState,
  videoResolutionState,
} from "@/store/store";
import { useEffect } from "react";

export const SetOptionsDialog = () => {
  const outputDefaultFormats = useRecoilValue(outputDefaultFormatState);
  const outputDefaultResolutions = useRecoilValue(outputDefaultResolutionState);

  const [outputFormats, setOutputFormats] = useRecoilState(videoFormatState);
  const [outputResolutions, setOutputResolutions] =
    useRecoilState(videoResolutionState);

  useEffect(() => {
    setOutputFormats(outputDefaultFormats);
    setOutputResolutions(outputDefaultResolutions);
  }, [outputDefaultFormats, outputDefaultResolutions]);
  return (
    <div className="grid grid-cols-2">
      <div className={cn("m-4 p-4 box-border space-y-4")}>
        <h1 className={cn("p-4 pl-0")}>Format</h1>
        {outputDefaultFormats.map((format: string) => (
          <div key={format} className="flex items-center space-x-2">
            <Checkbox
              id={format}
              defaultChecked={true}
              onCheckedChange={(checked) => {
                checked
                  ? !outputFormats.includes(format)
                    ? setOutputFormats([...outputFormats, format])
                    : null
                  : setOutputFormats(
                      outputFormats.filter(
                        (outputFormat) => outputFormat !== format,
                      ),
                    );
              }}
            />
            <label
              htmlFor={format}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              )}
            >
              {format}
            </label>
          </div>
        ))}
      </div>
      <div className={cn("m-4 p-4 box-border space-y-4")}>
        <h1 className={cn("p-4 pl-0")}>Resolutions</h1>
        {outputDefaultResolutions.map((resolution: string) => (
          <div key={resolution} className="flex items-center space-x-2">
            <Checkbox
              id={resolution}
              defaultChecked={true}
              onCheckedChange={(checked) => {
                checked
                  ? !outputResolutions.includes(resolution)
                    ? setOutputResolutions([...outputResolutions, resolution])
                    : null
                  : setOutputResolutions(
                      outputResolutions.filter(
                        (outputResolution) => outputResolution !== resolution,
                      ),
                    );
              }}
            />
            <label
              htmlFor={resolution}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {resolution}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
