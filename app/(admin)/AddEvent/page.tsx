'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const AddEvent = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [totalSeats, setTotalSeats] = useState<number>();
    const [imageUrl , setImageUrl] = useState("");

    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "unauthenticated") {
        router.push('/');
        return <p>Access Denied</p>
    }

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === "loading" || !session?.user?.email) return;

        try {
            const adminResponse = await axios.get(`/api/getAdminByEmail?email=${session?.user?.email}`);
            const admin = adminResponse.data;
            if (!admin) throw new Error("Admin not found.");

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

            setName("");
            setDate("");
            setImageUrl("");
            setLocation("");
            setDescription("");
        } catch (error) {
            console.error("There was an error adding the event!", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-5xl flex bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="w-1/2 hidden md:flex items-center justify-center bg-blue-500">
                    <img src="/event-art.svg" alt="Event Artwork" className="w-3/4 h-auto" />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">Add Event</h2>
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <form onSubmit={handleAddEvent}>
                                <div>
                                    <Label>Event Name</Label>
                                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div>
                                    <Label>Event Date</Label>
                                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                                </div>
                                <div>
                                    <Label>Image URL</Label>
                                    <Input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                                </div>
                                <div>
                                    <Label>Total Seats</Label>
                                    <Input type="number" value={totalSeats} min="1" onChange={(e) => setTotalSeats(parseInt(e.target.value))} required />
                                </div>
                                <div>
                                    <Label>Event Location</Label>
                                    <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                </div>
                                <div>
                                    <Label>Event Description</Label>
                                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                                <Button type="submit" className="w-full mt-4">Add Event</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;
