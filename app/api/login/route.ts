import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, name } = body;

    console.log("Received data:", { email, name });
    console.log("login backend",email,name)



    // Validate the email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    let newAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    // If the user doesn't exist, create a new one
    if (!newAdmin) {
      newAdmin = await prisma.admin.create({
        data: { email, name },
      });
    }

    // Return the user data
    return NextResponse.json({ newAdmin }, { status: 200 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}