import dbConnect from "../../../lib/dbConnect";
import Form from "../../../models/form";
import { NextResponse } from "next/server";

// CREATE (POST)
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log(body);
    const form = await Form.create(body);
    return NextResponse.json(form, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Error saving form" }, { status: 500 });
  }
}

// READ (GET all forms)
export async function GET() {
  try {
    await dbConnect();
    const forms = await Form.find({});
    return NextResponse.json(forms, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Error fetching forms" }, { status: 500 });
  }
}

// UPDATE (PATCH)
export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updateData } = body;

    const updated = await Form.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Error updating form" }, { status: 500 });
  }
}
