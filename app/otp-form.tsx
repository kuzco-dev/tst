"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function OtpForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const sendOtp = async () => {
    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });
    console.log("OTP envoyé", data, error);

    if (!error) {
      setOtpSent(true); 
    }
  };

  const verifyOtp = async () => {
    const { data, error } = await authClient.signIn.emailOtp({
      email,
      otp,
    });
    console.log("OTP vérifié", data, error);

    if (!error) {
      // Redirection après succès
      router.push("/create");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button onClick={sendOtp} className="bg-neutral-700 text-white p-2 rounded-md ml-2">
          Envoyer OTP
        </button>
      </div>
      {otpSent && (
        <div>
          <input
            type="text"
            placeholder="Code OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button onClick={verifyOtp} className="bg-neutral-700 text-white p-2 rounded-md ml-2">
            Vérifier OTP
          </button>
        </div>
      )}
    </div>
  );
}
