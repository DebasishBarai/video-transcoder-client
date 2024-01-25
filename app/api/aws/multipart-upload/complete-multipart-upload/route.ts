import { CurrentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

import { CompleteMultipartUploadCommand, S3Client } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  try {
    const { videoId, fileType, uploadId, parts } = await req.json();

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

    parts.sort(
      (a: any, b: any) => parseInt(a.PartNumber) - parseInt(b.PartNumber),
    );

    const command = new CompleteMultipartUploadCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `/users/${profile.id}/videos/${videoId}.${fileType}`,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
        //parts is an array of object i.e. parts = [
        //   {
        //     "ETag": "\"d8c2eafd90c266e19ab9dcacc479f8af\"",
        //     "PartNumber": "1"
        //   },
        //   {
        //     "ETag": "\"d8c2eafd90c266e19ab9dcacc479f8af\"",
        //     "PartNumber": "2"
        //   }
        // ]
      },
    });

    const response = await client.send(command);

    return NextResponse.json({
      msg: "video upload success",
      ETAG: response.ETag,
    });
  } catch (error) {
    console.log("[SERVERS_COMPLETE_MULTIPART_UPLOAD] ", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
