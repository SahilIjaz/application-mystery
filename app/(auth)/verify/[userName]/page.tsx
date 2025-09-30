import { verifySchema } from "@/schemas/verifySchema";
import { APIResponse } from "@/types/APIResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import * as z from "zod";

const verifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ userName: string }>();

  const form = useForm({
    resolver: zodResolver(verifySchema),
  });
  try {
    const isSubmitted = async (data: z.infer<typeof verifySchema>) => {
      const response = await axios.post("/api/verify-code", {
        userName: params.userName,
        code: data.code,
      });

      toast("success", {
        description: response.data.message,
      });

      router.replace("sign-in");
    };
  } catch (err) {
    Response.json(
      {
        message: "Erro during verification of code.",
        success: false,
      },
      { status: 500 }
    );
  }
};
