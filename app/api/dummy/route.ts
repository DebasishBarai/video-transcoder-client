import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fileName, fileType } = await req.json();

    console.log(`fileName: ${fileName}`);
    console.log(`fileType: ${fileType}`);
    return NextResponse.json({
      fileName,
      fileType,
    });
  } catch (error) {
    console.log("[SERVERS_PUT_OBJECT_URL] ", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
