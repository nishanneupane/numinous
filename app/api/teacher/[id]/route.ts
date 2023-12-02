import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile";
import { checkSubscription } from "@/lib/subscription";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const values = await req.json();
    const profile = await initialProfile();

    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse("Pro subscription required", { status: 403 });
    }
    
    if (!values || !profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const teacherProfile = await db.teacherProfile.update({
      where: {
        id: params.id,
        userId: profile.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(teacherProfile);
  } catch (error) {
    console.log("[TEACHER_ID_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse("Pro subscription required", { status: 403 });
    }
    const user = await initialProfile();

    if (!user || !params.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const deletedProfile = await db.teacherProfile.delete({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    return NextResponse.json(deletedProfile);
  } catch (error) {
    console.log("[TEACHER_ID_DELETE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
