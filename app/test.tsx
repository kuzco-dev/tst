import { auth } from "@/lib/auth";
import { signIn, signUp, sendOtp, verifyOtp } from "@/server-actions/user";
import { headers } from "next/headers";
import SignOut from "./signout";
import OtpForm from "./otp-form";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex flex-col gap-3 items-center justify-center p-10">
        <div>
            <h1>test 1</h1>
            <div className="flex gap-3">
                <button
                className="bg-neutral-700 text-white p-2 rounded-md"
                onClick={signIn}
                >
                Sign In
                </button>
                <button
                className="bg-neutral-700 text-white p-2 rounded-md"
                onClick={signUp}
                >
                Sign Up
                </button>
                <SignOut />
            </div>
        </div>
        <div>
            <h1>test 2</h1>
            <div>
                <h2 className="text-lg font-medium mb-2">Envoyer un code OTP</h2>
                <form action={sendOtp} className="flex flex-col gap-2">
                    <input 
                        type="email"
                        name="email"
                        placeholder="Entrez votre email"
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        className="bg-neutral-700 text-white p-2 rounded-md"
                    >
                        Envoyer OTP
                    </button>
                </form>
            </div>
            <div>
                <h2 className="text-lg font-medium mb-2">Vérifier un code OTP</h2>
                <form action={verifyOtp} className="flex flex-col gap-2">
                    <input 
                        type="email"
                        name="email"
                        placeholder="Entrez votre email"
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <input 
                        type="otp"
                        name="otp"
                        placeholder="Entrez le code"
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        className="bg-neutral-700 text-white p-2 rounded-md"
                    >
                        Vérifier OTP
                    </button>
                </form>
            </div>
            <div>
                <h1>test 3</h1>
                <OtpForm />

            </div>
        </div>
      <p>{!session ? "Not authenticated" : session.user.email}</p>
    </main>
  );
}