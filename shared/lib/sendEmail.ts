import { Resend } from "resend";
import React from "react";

export const sendEmail = async (to: string, subject: string, emailTemplate: React.ReactNode) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const { data, error } = await resend.emails.send({
    from: "TastyShop <onboarding@resend.dev>",
    to,
    subject,
    react: emailTemplate,
  });

  if (error) {
    throw new Error("Failed to send email");
  }

  return data;
};
