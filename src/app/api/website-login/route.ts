import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";

export const runtime = "nodejs";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;

const sanitize = (value: string) => value.trim().replace(/\s+/g, " ");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; fullName?: string };
    const email = sanitize((body.email ?? "").toLowerCase());
    const fullName = sanitize(body.fullName ?? "");

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (fullName && (fullName.length < 2 || fullName.length > 120)) {
      return NextResponse.json({ error: "Please enter a valid full name." }, { status: 400 });
    }

    const db = await getMongoDb();
    const websiteLogin = db.collection("websitelogin");
    await websiteLogin.createIndex({ email: 1 }, { unique: true, sparse: true });

    const now = new Date();
    const $set: Record<string, unknown> = {
      email,
      status: "pending_verification",
      source: "landing_login",
      updatedAt: now,
    };
    if (fullName) {
      $set.fullName = fullName;
    }

    await websiteLogin.updateOne(
      { email },
      {
        $set,
        $setOnInsert: { createdAt: now },
      },
      { upsert: true },
    );

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("website-login POST failed:", error);
    return NextResponse.json(
      { error: "Unable to complete sign-in right now. Please try again." },
      { status: 500 },
    );
  }
}
