"use client";

import { Typewriter } from "react-simple-typewriter";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const LandingContent = () => {
  return (
    <>
      <div className="m-4 p-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        <Typewriter
          words={[
            "Transcode videos",
            "Generate subtitles",
            "Create chapters",
            "With Ease",
          ]}
          loop={false}
        />
        <span>.</span>
      </div>
      <Link href="/sign-in">
        <Button variant="premium" className={cn("min-w-[200px]")}>
          Sign In
        </Button>
      </Link>
    </>
  );
};
