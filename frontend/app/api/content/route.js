import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Use existing siteSettings collection (single document structure)
const COLLECTION = "siteSettings";

function canWrite(session) {
  const role = session?.user?.role;
  return role === "admin" || role === "editor";
}

export async function GET() {
  try {
    const db = await getDb();
    // siteSettings is a single document (no _id filter needed, just get first one)
    const doc = await db.collection(COLLECTION).findOne({});
    if (!doc) return NextResponse.json({});
    // Remove _id and return the rest as content
    const { _id, ...content } = doc;
    return NextResponse.json(content);
  } catch (err) {
    console.error("GET /api/content error", err);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!canWrite(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (typeof body !== "object" || Array.isArray(body) || body === null) {
      return NextResponse.json({ error: "Expected object" }, { status: 400 });
    }

    const db = await getDb();
    // Update the single siteSettings document (upsert if doesn't exist)
    await db
      .collection(COLLECTION)
      .updateOne({}, { $set: body }, { upsert: true });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/content error", err);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
