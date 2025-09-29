"use client";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";
import { signupSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types/APIResponse";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userName, setUserName] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [isUserNameChecking, setIsUserNameChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUserName = useDebounceValue(userName, 300);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUserNameUnique = async () => {
      if (debouncedUserName) {
        setIsUserNameChecking(true);
        setUserNameMessage("");

        try {
          const response = await axios.get(
            `/api/username-check-unique?userName=${debouncedUserName}`
          );
          setUserNameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<APIResponse>;
          setUserNameMessage(
            axiosError.response?.data.message ?? "Error checking user name."
          );
        } finally {
          setIsUserNameChecking(false);
        }
      }
    };
    checkUserNameUnique();
  }, [debouncedUserName]);

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<APIResponse>("/api/sign-up", data);
      toast("Success", {
        description: response.data.message,
      });
      router.replace(`/verify/${userName}`);
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse>;
      setUserNameMessage(
        axiosError.response?.data.message ?? "Error signing up."
      );
      toast.error(`Sign-up failed: ${axiosError}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight ld:text-5xl mb-6">
            Join Mystery Message by SI
          </h1>
          <p className="mb-4">Sign-up to start your anonymous journey.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <input
                      placeholder="Enter your user name"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                        setUserName(value);
                      }}
                      className="w-full border rounded px-3 py-2"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      placeholder="Enter your email"
                      {...field}
                      className="w-full border rounded px-3 py-2"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="w-full border rounded px-3 py-2"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
