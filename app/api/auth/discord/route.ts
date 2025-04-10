import { NextResponse } from 'next/server';

const DISCORD_AUTH_URL = 'https://discord.com/oauth2/authorize';

export async function GET() {
  // Paramètres nécessaires pour générer l'URL de redirection
  const clientId = "1289016796006977538"
  const redirectUri = "http://localhost:3000/api/auth/discord/callback"
  const scope = 'identify guilds';

  // Vérifie si les variables d'environnement sont définies
  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: 'Missing Discord client ID or redirect URI' }, { status: 400 });
  }

  // Générer un état aléatoire pour la sécurité (optionnel mais recommandé)
  const state = 'random_state_value'; // Peut être un nonce sécurisé, pour l'instant c'est une valeur fixe

  // Construire l'URL de redirection pour Discord
  const authUrl = `${DISCORD_AUTH_URL}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}&response_type=code`;

  // Retourner l'URL sous forme de JSON
  return NextResponse.json({ url: authUrl });
}
