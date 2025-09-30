



"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ userName: string }>();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const isSubmitted = async (data: z.infer<typeof verifySchema>) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/verify-code", {
        userName: params.userName,
        code: data.code,
      });

      toast("success", {
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (err: any) {
      toast("error", {
        description:
          err.response?.data?.message || "Error during verification of code.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight ld:text-5xl mb-6">
            Join Mystery Message by SI
          </h1>
          <p className="mb-4">Verify to start your anonymous journey.</p>
        </div>

        {/* Form wrapper provides context to FormField */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(isSubmitted)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <input
                      placeholder="Enter code"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the code sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAccount;
