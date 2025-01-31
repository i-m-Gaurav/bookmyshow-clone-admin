"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from 'next/link'


const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-red-500 text-2xl font-bold">
                <Link href='/'>
                show<span className="text-blue-500">Time</span></Link>
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          {/* <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
              />
            </div>
          </div> */}

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Location Selector */}
            {/* <div className="flex items-center space-x-1 text-gray-700">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Patna</span>
            </div> */}

            {/* Auth Section */}
            {status === "authenticated" ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 text-sm">
                  Hello, {session.user?.name}
                </span>
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <button
                  onClick={() => signOut()}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;