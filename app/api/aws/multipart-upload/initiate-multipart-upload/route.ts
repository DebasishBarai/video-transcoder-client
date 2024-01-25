import { CurrentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

import { CreateMultipartUploadCommand, S3Client } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  try {
    const { videoId, fileType } = await req.json();

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

    const command = new CreateMultipartUploadCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `/users/${profile.id}/videos/${videoId}.${fileType}`,
      ContentType: `video/${fileType}`,
    });

    const response = await client.send(command);

    return NextResponse.json({
      uploadId: response.UploadId,
    });
  } catch (error) {
    console.log("[SERVERS_CREATE_MULTIPART_UPLOAD] ", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
