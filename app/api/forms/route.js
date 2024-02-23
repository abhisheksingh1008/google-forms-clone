import connectToDB from "@/db";
import Form from "@/models/form-schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDB();
    const session = await getServerSession({ req });
    if (session && session.user) {
      const page = req.nextUrl.searchParams.get(["page"]);
      // console.log(page);
      const count = await Form.countDocuments({
        createdBy: session.user.email,
      });
      const forms = await Form.find({ createdBy: session.user.email });

      return NextResponse.json(
        { success: true, total: count, forms },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Login to fetch forms." },
        { status: 400 }
      );
    }
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

export const POST = async (req) => {
  try {
    await connectToDB();
    const session = await getServerSession({ req });
    if (session && session.user) {
      const { formData } = await req.json();
      const newForm = new Form({
        ...formData,
        ...(formData.title.trim() === "" && { title: "Untitled form" }),
      });
      //   console.log(newForm);
      await newForm.save();

      return NextResponse.json(
        { success: true, message: "New form created successfully." },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Login to create a new form." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong, could not fetch." },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  try {
    await connectToDB();
    const session = await getServerSession({ req });
    if (session && session.user) {
      const { formId, formData } = await req.json();
      const form = await Form.findById(formId);

      if (!form) {
        return NextResponse.json(
          { success: false, message: "Invalid form id." },
          { status: 400 }
        );
      }

      if (form.createdBy !== session.user.email) {
        return NextResponse.json(
          {
            success: false,
            message: "Only the creator of the form can change it.",
          },
          { status: 401 }
        );
      }

      for (const key in formData) {
        form[key] = formData[key];
      }

      await form.save();

      return NextResponse.json(
        { success: true, message: "Form updated successfully." },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Login to create a new form." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong, could not save changes.",
      },
      { status: 500 }
    );
  }
};
