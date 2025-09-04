//@ts-nocheck
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL || "mongodb+srv://shubhankersaxena5_db_user:BlSyNoVODv5o0NfN@checkout.xipptam.mongodb.net/";

let hasLoggedConnected = false;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return; // already connected

  try {
    await mongoose.connect(MONGODB_URI);
    if (!hasLoggedConnected) {
      console.log("✅ MongoDB connected", { uri: sanitizeUri(MONGODB_URI) });
      hasLoggedConnected = true;
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

export function getDbStatus() {
  const states: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  const readyState = mongoose.connection.readyState;
  return { readyState, state: states[readyState] ?? "unknown" };
}

function sanitizeUri(uri: string) {
  try {
    const u = new URL(uri);
    if (u.password) u.password = "***";
    return u.toString();
  } catch {
    return uri;
  }
}
 
