import connectToDB from "@/db";
import Response from "@/models/response-schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDB();
    const session = await getServerSession({ req });
    if (session && session.user) {
      const formId = req.nextUrl.searchParams.get(["formId"]);
      console.log(formId);
      const responses = await Response.find({ formId });

      return NextResponse.json({ success: true, responses }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "Login to fetch responses." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, could not fetch responses.",
        error,
      },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();
    const session = await getServerSession({ req });
    const { response } = await req.json();
    const newResponse = new Response({
      ...response,
      ...(session && session?.user && { submittedBy: session.user.email }),
    });
    console.log(response, newResponse);

    await newResponse.save();

    return NextResponse.json(
      { success: true, message: "Response submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      {
        success: false,
        message: "Something went wrong, could not submit response.",
      },
      { status: 500 }
    );
  }
};
