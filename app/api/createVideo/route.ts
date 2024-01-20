import { CurrentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();

    const profile = await CurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //upload video file data to the database
    const video = await prisma.uploadedVideo.create({
      data: {
        title,
        description,
        videoUrl: "",
        profileId: profile.id,
        // Optionally provide values for other properties like transcodeFormats, transcodeResolutions, etc.
      },
    });

    if (!video) {
      console.log("[DATABASE_CREATION_FAILED]");

      return new NextResponse("Internal Error", { status: 500 });
    }

    return NextResponse.json({
      videoId: video.id,
    });
  } catch (error) {
    console.log("[SERVERS_PUT_OBJECT_URL] ", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
