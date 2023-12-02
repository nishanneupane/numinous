import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile";
import { checkSubscription } from "@/lib/subscription";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await initialProfile();

    const { title } = await req.json();
    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse("Pro subscription required", { status: 403 });
    }
    
    if (!title || !profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lead = await db.teacherProfile.create({
      data: {
        title: title,
        userId: profile.id,
        isPublished: false,
      },
    });
    return NextResponse.json(lead);
  } catch (error) {
    console.log("[TEACHER_CREATION_ERROR]", error);
    return NextResponse.json("Internal Error", { status: 500 });
  }
}
