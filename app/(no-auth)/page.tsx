import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOut from "../signout";
import OtpForm from "../otp-form";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex flex-col gap-3 items-center justify-center p-10">
        <div>
            <SignOut />
            <OtpForm />
        </div>
      <p>{!session ? "Not authenticated" : session.user.email}</p>
    </main>
  );
}