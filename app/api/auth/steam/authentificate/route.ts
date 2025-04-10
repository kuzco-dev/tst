import SteamAuth from "node-steam-openid";
import { NextResponse } from 'next/server';

const steam = new SteamAuth({
  realm: "http://localhost:3000", 
  returnUrl: "http://localhost:3000/api/auth/steam/authentificate", 
  apiKey: "6F3F4B88F93B4ADABED007E167216896",
});

export async function GET(req) {
    console.log(req)
  try {
    const user = await steam.authenticate(req);
    console.log(user);
    const frontendUrl = 'http://localhost:3000/steam';
    return NextResponse.redirect(frontendUrl);
  } catch (error) {
    console.error(error);
    return new NextResponse('Authentication failed', { status: 500 });
  }
}
