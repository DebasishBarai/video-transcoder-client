import { CurrentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await CurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const outputDefaultFormats = ["mp4", "webm", "ogg"];
    return NextResponse.json({
      outputDefaultFormats,
    });
  } catch (error) {
    console.log("[SERVERS_GET_OUTPUT_DEFAULT_FORMATS_URL] ", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
