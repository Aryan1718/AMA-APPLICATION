import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { apiResponse } from "@/types/apiResponse";

export async function sendEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<apiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "AMA Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
     
    console.log("email sent")
    return {
      success: true,
      message: "Successfully Sent",
    };
  } catch (error) {
    console.error("Sorry Not able to send the verification Code", error);
    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}
