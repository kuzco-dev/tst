import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  // Vérifie que le code est présent dans l'URL
  if (!code) {
    return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
  }

  // Vérification du paramètre 'state' (optionnel mais recommandé pour la sécurité)
  if (state !== 'random_state_value') {
    return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 });
  }

  try {
    // Étape 1 : Échanger le code d'autorisation contre un access token
    const params = new URLSearchParams();
    params.append('client_id', '1289016796006977538'); // Ton client_id
    params.append('client_secret', 'MdRvv3OX2SUL5nq5X5tp4p-YMmULhaBV'); // Ton client_secret
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', 'http://localhost:3000/api/auth/discord/callback'); // Ton redirect_uri ici

    const response = await axios.post('https://discord.com/api/oauth2/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;

    // Étape 2 : Récupérer les informations de l'utilisateur avec l'access token
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = userResponse.data;

    return NextResponse.json({
      message: 'Authenticated successfully',
      user: userData,
    });
  } catch (error) {
    console.error('Error during authentication', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
