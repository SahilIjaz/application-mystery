import { resend } from "@/lib/resend";

import EmailTemplate from "@/emails/verificationEmails";
import { APIResponse } from "@/types/APIResponse";

export async function sendVerifictionEmail(
  email: string,
  userName: string,
  verifyCode: string
): Promise<APIResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry message | verification email",
      react: EmailTemplate({ userName, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Verification emailsent successfully.",
    };
  } catch (error) {
    console.error("Error sending verification Email.");
    return {
      success: false,
      message: "Failed to send verification Email.",
    };
  }
}
