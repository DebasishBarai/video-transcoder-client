import { CurrentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { videoId, videoType } = await req.json(); //videotype = 'uploadedVideo' || 'transcodedVideo'

    const profile = await CurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // @ts-ignore
    const client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    if (videoType === "uploadedVideo") {
      const video = await prisma.uploadedVideo.findUnique({
        where: {
          id: videoId,
          profileId: profile.id,
        },
      });

      if (!video) {
        return new NextResponse("Unauthorised", { status: 401 });
      }

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `/users/${profile.id}/videos/${video.id}.${video.fileType}`,
      });

      const url = await getSignedUrl(client, command, { expiresIn: 3600 });

      return NextResponse.json({
        getObjectPreSignedUrl: url,
      });
    } else {
      const video = await prisma.transcodedVideo.findUnique({
        where: {
          id: videoId,
          originalVideo: {
            profileId: profile.id,
          },
        },
      });

      if (!video) {
        return new NextResponse("Unauthorised", { status: 401 });
      }

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `/users/${profile.id}/videos/${video.originalVideoId}/transcoded/${video.id}.${video.fileType}`,
      });

      const url = await getSignedUrl(client, command, { expiresIn: 3600 });

      return NextResponse.json({
        getObjectPreSignedUrl: url,
      });
    }
  } catch (error) {
    console.log("[SERVERS_GET_OBJECT_URL] ", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
