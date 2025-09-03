import dbConnect from "../../../../lib/dbConnect";
import Form from "../../../../models/form";
import { NextResponse } from "next/server";

// GET form details by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const form = await Form.findById(params.id);

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(form, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Error fetching form details" }, { status: 500 });
  }
}
