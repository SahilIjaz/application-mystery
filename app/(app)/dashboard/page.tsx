'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { User } from 'next-auth'
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';

function dashboard() {

    const { data: session } = useSession();

    const user: User = session?.user as User;

    return (
        <nav className='p-5 bg-gray-200 flex justify-between items-center'>
            <div className='container mx-auto flex justify-between items-center md:px-20'>
                <a className='font-bold text-2xl mb-4 mb:mb-0'
                    href="#">mysteryMessage</a>

                {
                    session ? (
                        <>
                            <span className='mr-4'>Welcome, {user.userName || user.email}</span>
                            <Button className='bg-red-500 hover:bg-red-600 text-white'
                                onClick={() => signOut}>LogOut</Button>
                        </>
                    ) : (
                        <Link href="/sign-in"><Button className='bg-red-500 hover:bg-red-600 text-white'>LogIn</Button></Link>
                    )
                }
            </div>
        </nav>

    )
}

export default dashboard