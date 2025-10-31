// app/api/leaves/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";

interface LeaveHistory {
  type: string;
  date: string;
  time: string;
  day: string;
}

interface LeaveDoc {
  userId: string;
  casual: number;
  medical: number;
  annual: number;
  history: LeaveHistory[];
}

// Mock database
const leaveStore = new Map<string, LeaveDoc>();

// ✅ Fixed GET
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params; // <-- ✅ await here!

    let doc = leaveStore.get(userId);
    if (!doc) {
      doc = { userId, casual: 0, medical: 0, annual: 0, history: [] };
      leaveStore.set(userId, doc);
    }

    return NextResponse.json(doc);
  } catch (error) {
    console.error("GET error", error);
    return NextResponse.json({ error: "Failed to fetch leave data" }, { status: 500 });
  }
}

// ✅ Fixed PUT
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params; // <-- ✅ await here!
    const body = await request.json();

    const doc: LeaveDoc = {
      userId,
      casual: body.casual,
      medical: body.medical,
      annual: body.annual,
      history: body.history,
    };

    leaveStore.set(userId, doc);

    return NextResponse.json(doc);
  } catch (error) {
    console.error("PUT error", error);
    return NextResponse.json({ error: "Failed to update leave data" }, { status: 500 });
  }
}
