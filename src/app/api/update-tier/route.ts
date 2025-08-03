// src/app/api/update-tier/route.ts

import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, tier } = await request.json();

    if (!userId || !tier) {
      return NextResponse.json({ error: "Missing userId or tier" }, { status: 400 });
    }

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        tier,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Clerk update error:", err);
    return NextResponse.json({ error: "Failed to update tier" }, { status: 500 });
  }
}
