'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function NavBar() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <nav className="p-5 bg-gray-200">Loading...</nav>;
    }

    const user = session?.user;

    return (
        <nav className="p-5 bg-gray-200 flex justify-between items-center">
            <div className="container mx-auto flex justify-between items-center md:px-20">
                <a className="font-bold text-2xl mb-4 md:mb-0" href="#">
                    mysteryMessage
                </a>

                {session ? (
                    <>
                        <span className="mr-4">Welcome, {user?.userName || user?.email}</span>
                        <Button
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => signOut()}
                        >
                            LogOut
                        </Button>
                    </>
                ) : (
                    <Button

                        className="bg-red-500 hover:bg-red-600 text-white"
                    >
                        <Link href="/sign-in">LogIn</Link>
                    </Button>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
