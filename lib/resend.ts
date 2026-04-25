import { Resend } from "resend";

export const isResendConfigured = !!process.env.RESEND_API_KEY;

let cached: Resend | null = null;

export function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Resend not configured (RESEND_API_KEY missing)");
  }
  if (!cached) {
    cached = new Resend(process.env.RESEND_API_KEY);
  }
  return cached;
}

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Augusto Lisboa <ola@augustolisboa.pt>";
