'use client';

import { useRouter } from 'next/navigation'
import eventImage from '../public/event.svg'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"
import { useSession } from 'next-auth/react';


export default function Home() {

  const router = useRouter();
  const { toast } = useToast()
  const { data: session, status } = useSession();

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden"> {/* Assuming navbar is 64px */}
      {/* Left side - Image */}
      <div className="hidden md:block w-1/2 relative">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for better form visibility */}
        <Image
          src={eventImage}
          alt="event"
          fill
          className="object-cover"
          priority
        />
        {/* Text overlay */}
        <div className="absolute z-20 bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold mb-2">Create Amazing Events</h1>
          <p className="text-lg text-gray-200">Build unforgettable experiences</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 bg-gray-50 flex justify-center ">
        <div className="max-w-md mx-auto py-8 px-4 flex flex-col justify-center items-center ">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">List your event here.</h1>
          <Button className='bg-red-500 hover:bg-red-600' variant="destructive" onClick={() => {
            if (status !== 'authenticated') {
              toast({
                title: "Uh oh! Something went wrong.",
                description: "Please Login to add an event.",
              })
              return
            }
            router.push('/AddEvent')
          }}>Add Event</Button>
        </div>
      </div>
    </div>

  );
}
