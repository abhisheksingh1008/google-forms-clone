import connectToDB from "@/db";
import Form from "@/models/form-schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { formId } = params;
    // console.log(formId);
    const form = await Form.findById(formId);

    return NextResponse.json({ success: true, form }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, could not fetch.",
        error,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const session = await getServerSession({ req });
    if (session && session?.user) {
      const { formId } = params;
      console.log(formId);
      const form = await Form.findById(formId);

      if (!form) {
        return NextResponse.json(
          {
            success: false,
            message: "No form exists with given id.",
          },
          { status: 400 }
        );
      }

      if (session?.user?.email === form.createdBy) {
        await Form.deleteOne({ _id: formId });
        return NextResponse.json(
          { success: true, message: "Form has been deleted." },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Only the creator of the form can delete it.",
          },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: "Login to delete form." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, could not delete form.",
      },
      { status: 500 }
    );
  }
};
