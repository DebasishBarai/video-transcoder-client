import { CurrentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

import {
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(req: Request) {
  try {
    const { videoId, fileType, uploadId, noOfChunks } = await req.json();

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

    const promises = [];

    for (let i = 0; i < noOfChunks; i++) {
      const command = new UploadPartCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `/users/${profile.id}/videos/${videoId}.${fileType}`,
        UploadId: uploadId,
        PartNumber: i + 1,
      });

      promises.push(getSignedUrl(client, command, { expiresIn: 3600 }));
    }

    const putMultipartPreSignedUrls = await Promise.all(promises);

    return NextResponse.json({
      putMultipartPreSignedUrls,
    });
  } catch (error) {
    console.log("[SERVERS_PUT_MULTIPART_PRESIGNED_URL] ", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
