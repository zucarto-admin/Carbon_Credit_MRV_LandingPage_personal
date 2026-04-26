import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";

export const runtime = "nodejs";

type ConnectRequestPayload = {
  fullName: string;
  email: string;
  company: string;
  useCase: string;
  hectaresRange: string;
};

const allowedHectareRanges = new Set([
  "under-500",
  "500-5000",
  "5000-100000",
  "100000-plus",
]);

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;

const sanitize = (value: string) => value.trim().replace(/\s+/g, " ");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ConnectRequestPayload>;

    const fullName = sanitize(body.fullName ?? "");
    const email = sanitize((body.email ?? "").toLowerCase());
    const company = sanitize(body.company ?? "");
    const useCase = sanitize(body.useCase ?? "");
    const hectaresRange = sanitize(body.hectaresRange ?? "");

    if (!fullName || fullName.length < 2 || fullName.length > 120) {
      return NextResponse.json({ error: "Please enter a valid full name." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid business email." }, { status: 400 });
    }

    if (!company || company.length > 160) {
      return NextResponse.json({ error: "Please enter a valid company name." }, { status: 400 });
    }

    if (!useCase || useCase.length < 20 || useCase.length > 1200) {
      return NextResponse.json(
        { error: "Use case should be between 20 and 1200 characters." },
        { status: 400 },
      );
    }

    if (!allowedHectareRanges.has(hectaresRange)) {
      return NextResponse.json({ error: "Please select a valid hectare range." }, { status: 400 });
    }

    const db = await getMongoDb();
    const now = new Date();

    const connectRequests = db.collection("connect_requests");
    const websiteLogin = db.collection("websitelogin");

    await Promise.all([
      connectRequests.createIndex({ email: 1, createdAt: -1 }),
      connectRequests.createIndex({ status: 1, createdAt: -1 }),
      websiteLogin.createIndex({ email: 1 }, { unique: true, sparse: true }),
    ]);

    await connectRequests.insertOne({
      fullName,
      email,
      company,
      useCase,
      hectaresRange,
      status: "new",
      source: "landing-page",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ ok: true, message: "Request submitted successfully." }, { status: 201 });
  } catch (error) {
    console.error("connect_requests POST failed:", error);
    return NextResponse.json(
      { error: "Unable to submit request right now. Please try again." },
      { status: 500 },
    );
  }
}
