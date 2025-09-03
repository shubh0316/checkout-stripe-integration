import { NextResponse } from "next/server";
import { connectDB, getDbStatus } from "../../../lib/db";

export async function GET() {
  try {
    await connectDB();
  } catch {}

  const status = getDbStatus();
  return NextResponse.json({ mongo: status }, { status: 200 });
}




