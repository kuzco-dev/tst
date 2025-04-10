import SteamAuth from "node-steam-openid";
import { NextResponse } from 'next/server';

const steam = new SteamAuth({
  realm: "http://localhost:3000", 
  returnUrl: "http://localhost:3000/api/auth/steam/authentificate", 
  apiKey: "6F3F4B88F93B4ADABED007E167216896",
});

export async function GET(req) {
  const redirectUrl = await steam.getRedirectUrl();
  console.log(redirectUrl)
  return NextResponse.redirect(redirectUrl);
}