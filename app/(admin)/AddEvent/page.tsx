'use client';

import axios from 'axios';
import React, {  useState } from 'react';
import { useSession } from 'next-auth/react';

const AddEvent = () => {
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const {data: session,status} = useSession();

    console.log(session)

   


    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();

        
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

            const adminId = admin.id;




            const response = await axios.post("/api/addEvent", {
                name,
                date,
                location,
                description,
                adminId,
            });

            console.log(response.data);

            // Clear the form after successful submission
            setName("");
            setDate("");
          
            setLocation("");
            setDescription("");
        } catch (error) {
            console.error("There was an error adding the event!", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleAddEvent} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Event</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter event name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div> */}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter event location"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter event description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Add Event
                </button>
            </form>
        </div>
    );
};

export default AddEvent;