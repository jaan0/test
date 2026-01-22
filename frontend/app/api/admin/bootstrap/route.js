import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req) {
  try {
    const token = process.env.ADMIN_BOOTSTRAP_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Bootstrap token not configured" }, { status: 500 });
    }

    const provided = req.headers.get("x-bootstrap-token");
    if (!provided || provided !== token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username, email, password, role = "admin" } = await req.json();
    // Support both username (existing schema) and email
    const userIdentifier = username || email;
    if (!userIdentifier || !password) {
      return NextResponse.json({ error: "Username/email and password are required" }, { status: 400 });
    }

    const db = await getDb();
    const users = db.collection("users");
    // Check if user exists by username or email
    const existing = await users.findOne({
      $or: [
        { username: userIdentifier.toLowerCase() },
        { email: userIdentifier.toLowerCase() }
      ]
    });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Existing schema uses 'password' field, not 'passwordHash'
    const passwordHash = await hashPassword(password);
    await users.insertOne({
      username: username || userIdentifier.toLowerCase(),
      email: email || null,
      password: passwordHash, // Use 'password' field to match existing schema
      role,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Bootstrap error", err);
    return NextResponse.json({ error: "Failed to bootstrap admin" }, { status: 500 });
  }
}
