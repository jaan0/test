import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const COLLECTION = "services";

function canWrite(session) {
  const role = session?.user?.role;
  return role === "admin" || role === "editor";
}

export async function GET() {
  try {
    const db = await getDb();
    // Existing services may not have 'order' field, sort by createdAt or _id
    const docs = await db
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1, _id: 1 }) // Most recent first, fallback to _id
      .toArray();

    // Remove _id and return services (existing schema: title, description, price, features, badge, icon, createdAt, imageUrl)
    const services = docs.map(({ _id, ...rest }) => rest);
    return NextResponse.json(services);
  } catch (err) {
    console.error("GET /api/services error", err);
    return NextResponse.json(
      { error: "Failed to load services" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!canWrite(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Expected array of services" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection(COLLECTION);

    // Replace existing services with the new array (simple CMS-style overwrite)
    await collection.deleteMany({});
    if (body.length) {
      const docs = body.map((s) => ({
        ...s,
        createdAt: s.createdAt || new Date(), // Preserve createdAt if provided
      }));
      await collection.insertMany(docs);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/services error", err);
    return NextResponse.json(
      { error: "Failed to save services" },
      { status: 500 }
    );
  }
}

