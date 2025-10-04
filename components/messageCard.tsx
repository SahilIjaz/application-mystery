import React from 'react'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { X } from 'lucide-react';
import { Message } from '@/models/User';
import axios from 'axios';
import { toast } from 'sonner';

type MessageDeleteProps = {
    message: Message,
    onMessageDelete: (messageId: string) => void
}

const messageCard = ({ message: onMessageDelete }: MessageDeleteProps) => {
    const onDeleteHandle = async () => {
        try {
            const deletedMessage = await axios.delete(`/api/delete-message/${message._id}`);
            toast(deletedMessage.data.message);
            onMessageDelete(message._id); 
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>


                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive"><X className='w-5 h-5' /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={onDeleteHandle}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>Card Action</CardAction>
                </CardHeader>


                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default messageCard