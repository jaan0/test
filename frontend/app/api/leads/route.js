import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import crypto from "crypto";

// Use existing contactMessages collection
const COLLECTION = "contactMessages";

function canView(session) {
  const role = session?.user?.role;
  return role === "admin" || role === "editor" || role === "viewer";
}

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!canView(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);
  const skip = (page - 1) * pageSize;

  try {
    const db = await getDb();
    const total = await db.collection(COLLECTION).countDocuments();
    const items = await db
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    return NextResponse.json({ items, page, pageSize, total });
  } catch (err) {
    console.error("GET /api/leads error", err);
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email, message, service } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const db = await getDb();
    // Match existing schema: name, email, service, message, read, createdAt
    await db.collection(COLLECTION).insertOne({
      name,
      email,
      service: service || null, // Optional service field
      message,
      read: false, // Default to unread
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/leads error", err);
    return NextResponse.json({ error: "Failed to submit lead" }, { status: 500 });
  }
}
