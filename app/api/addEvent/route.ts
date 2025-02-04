import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'

export async function POST(req: NextRequest) {



  

   
  try {
    // Parse the request body
    const body = await req.json();
    const { name, description, date, location, adminId,imageUrl, totalSeats, } = body;

    console.log("Received data:", { name, description, date, location,imageUrl, totalSeats, adminId });

    console.log("Body data" , {body});

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
          imageUrl,
          adminId,
          totalSeats,
          availableSeats : totalSeats,
          seat : {
            create : Array.from({length : totalSeats},(_,index)=>({
              number : index + 1,
            }))
          },
      },
      });

    console.log("Event created:", newEvent);

    // Return the created event

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error saving event:", error);
    
  }
}