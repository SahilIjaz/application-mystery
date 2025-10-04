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
        <nav>
            <div>
                <a href="#">mysteryMessage</a>

                {
                    session ? (
                        <>
                            <span>Welcome, {user.userName || user.email}</span>
                            <Button onClick={() => signOut}>LogOut</Button>
                        </>
                    ) : (
                        <Link href="/sign-in">SignIn</Link>
                    )
                }
            </div>
        </nav>

    )
}

export default dashboard