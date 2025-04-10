import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { emailOTP } from "better-auth/plugins";
import { Resend } from 'resend';
import { nextCookies } from "better-auth/next-js";

 
const prisma = new PrismaClient();
const resend = new Resend('re_GHHea72L_NDNVy9RcskjXazewscNuvhzf');

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {    
        enabled: true
    },
    plugins: [
        emailOTP({ 
            async sendVerificationOTP({ email, otp, type}) { 
                const emailContent = `
                    <p>Bonjour,</p>
                    <p>Voici votre code de vérification :</p>
                    <h2>${otp}</h2>
                    <p>Merci de ne pas partager ce code avec d'autres personnes.</p>
                    <p>Si vous n'avez pas demandé cette vérification, veuillez ignorer ce message.</p>
                `;
                await resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: email,
                    subject: 'Votre code de vérification',
                    html: emailContent
                });
			}, 
        }),
        nextCookies()
    ]
});