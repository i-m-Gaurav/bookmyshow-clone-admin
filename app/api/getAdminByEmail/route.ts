import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Extract the email query parameter
    const email = req.nextUrl.searchParams.get("email");

    console.log(email);

    // Validate the email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Query the admin from the database
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    // If admin not found, return a 404 response
    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    // Return the admin details
    return NextResponse.json(admin, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin by email:", error);

    // Handle server errors
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
