import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {

   
  try {
    // Parse the request body
    const body = await req.json();
    const { name, description, date, location, adminId, totalSeats, } = body;

    console.log("Received data:", { name, description, date, location,totalSeats, adminId });

    // Validate required fields
    if (!name || !description || !date || !location || !adminId) {
      return NextResponse.json(
        { error: "All fields are required, including adminId" },
        { status: 400 }
      );
    }

    // Create the event
   const newEvent = await prisma.event.create({
        data: {
            name,
            description,
            date : new Date(date),
            location,
            adminId,
            totalSeats,
            availableSeats : totalSeats,
        },
        });

        console.log("Event created:", newEvent);


    // Return the created event

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error saving event:", error);
    
  }
}