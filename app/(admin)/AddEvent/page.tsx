'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import eventImage from '../../../public/event.svg'
import { useToast } from "@/hooks/use-toast"
 

const AddEvent = () => {
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [totalSeats, setTotalSeats] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [eventAdded, setEventAdded] = useState<boolean>(false);
    const { toast } = useToast()


    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "unauthenticated") {
        router.push('/');
    }

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("status is this :", status);


        if (status === "loading") {
            console.log("Session is still loading...");
            return;
        }



        if (!session?.user?.email) {
            console.error("User is not authenticated or adminId is missing.");
            return;
        }

        try {

            const adminResponse = await axios.get(`/api/getAdminByEmail?email=${session?.user?.email}`);
            const admin = adminResponse.data;

            if (!admin) {
                throw new Error("Admin not found.");
            }

            console.log("image url is ", imageUrl);

            const adminId = admin.id;
            await axios.post("/api/addEvent", {
                name,
                date,
                location,
                imageUrl,
                description,
                totalSeats,
                adminId,
            });

           

          

            // Clear the form after successful submission
            setName("");
            setDate("");
            setImageUrl("");
            setLocation("");
            setDescription("");
            setTotalSeats(0);
            setEventAdded(true);

           
        } catch (error) {
            console.error("There was an error adding the event!", error);
        }
    };

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
                    <h1 className="text-4xl font-bold mb-2">Book Amazing Events</h1>
                    <p className="text-lg text-gray-200">Enjoy unforgettable experiences</p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 bg-gray-50 overflow-y-auto">
                <div className="max-w-md mx-auto py-8 px-4">
                    <form onSubmit={handleAddEvent} className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Add Event</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter event name"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image URL
                            </label>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Enter image URL"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Total Seats
                            </label>
                            <input
                                type="number"
                                id="totalSeats"
                                name="totalSeats"
                                value={totalSeats}
                                onChange={(e) => setTotalSeats(parseInt(e.target.value))}
                                min="1"
                                placeholder="Enter total seats"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Location
                            </label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter event location"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter event description"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition duration-200 font-medium"
                            onClick={()=>{
                                if(eventAdded){
                                    toast({
                                        title: "Event Added Successfully",
                                       
                                    })
                                    router.push('/');
                                }
                            }}
                        >
                            Add Event
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AddEvent;