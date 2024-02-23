import connectToDB from "@/db";
import Form from "@/models/form-schema";
import Response from "@/models/response-schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const session = await getServerSession({ req });
    if (session && session.user) {
      const { responseId } = params;
      const response = await Response.findById(responseId);
      if (!response)
        return NextResponse.json(
          { success: false, message: "No response found with given id." },
          { status: 400 }
        );

      const form = await Form.findById(response.formId);

      return NextResponse.json(
        { success: true, form, response },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Login to fetch response." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, could not fetch response.",
        error,
      },
      { status: 500 }
    );
  }
};
