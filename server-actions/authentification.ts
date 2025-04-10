// @/server-actions/authentification.ts
'use server'

import { authClient } from '@/lib/auth-client';

export async function sendOtp(formData: FormData) {
  const email = formData.get('email') as string;
  const { data:t, error } = await authClient.emailOtp.sendVerificationOtp({
    email,
    type: 'sign-in',
  });
  console.log(t);
  return { success: true, message: 'OTP envoyé avec succès' };
}

export async function verifyOtp(formData: FormData) {
  const email = formData.get('email') as string;
  const otp = formData.get('otp') as string;
  const { data:g, error } = await authClient.signIn.emailOtp({
    email,
    otp
  });
  console.log(g);
  return { success: true, message: 'OTP vérifié avec succès.' };
}

