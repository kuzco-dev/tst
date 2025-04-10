"use server";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client"

export const signIn = async () => {
    await auth.api.signInEmail({
        body: {
            email: "max.malpica33@gmail.com",
            password: "password123"
        }
    })
}

export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            email: "max.malpica33@gmail.com",
            password: "password123",
            name: "max"
        }
    })
}

export async function sendOtp(formData: FormData) {
  const email = formData.get('email') as string;
  const { data:t, error } = await authClient.emailOtp.sendVerificationOtp({
    email,
    type: 'sign-in',
  });
  console.log(t);
}

export async function verifyOtp(formData: FormData) {
  const email = formData.get('email') as string;
  const otp = formData.get('otp') as string;
  const { data:g, error } = await authClient.signIn.emailOtp({
    email,
    otp
  });
  console.log(g);
}