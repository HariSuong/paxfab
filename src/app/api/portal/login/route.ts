import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  authenticatePortalUser,
  encodeSession,
  SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
  toSessionPayload,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const result = await authenticatePortalUser(email, password);

    if (result.status === "deactivated") {
      return NextResponse.json(
        {
          error:
            "Your project portal access has expired or been deactivated. Please contact Paxfab support.",
        },
        { status: 403 },
      );
    }

    if (result.status !== "ok") {
      return NextResponse.json(
        {
          error:
            "Invalid credentials. Contact your Paxfab Project Coordinator.",
        },
        { status: 401 },
      );
    }

    const session = toSessionPayload(result.client);
    const cookieStore = await cookies();
    cookieStore.set(
      SESSION_COOKIE,
      encodeSession(session),
      SESSION_COOKIE_OPTIONS,
    );

    return NextResponse.json({
      user: {
        client_id: session.clientId,
        company_name: session.companyName,
        project_name: session.projectName,
        email: session.email,
        role: session.role,
      },
    });
  } catch (error) {
    console.error("[portal/login]", error);
    return NextResponse.json(
      { error: "Unable to process login request." },
      { status: 500 },
    );
  }
}
