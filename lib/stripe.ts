import Stripe from "stripe";

export const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY;

let cached: Stripe | null = null;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe not configured (STRIPE_SECRET_KEY missing)");
  }
  if (!cached) {
    cached = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return cached;
}
