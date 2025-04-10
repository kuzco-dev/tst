import { Issuer } from 'openid-client';

let client;

export async function getOpenIDClient() {
  if (client) return client;

  // Découverte de la configuration d'OpenID de Steam
  const steamIssuer = await Issuer.discover('https://steamcommunity.com/openid');
  
  // Création du client OpenID
  client = new steamIssuer.Client({
    client_id: 'TON_CLIENT_ID',
    client_secret: 'TON_CLIENT_SECRET',
    redirect_uris: ['http://localhost:3000/api/auth/callback'],
    response_types: ['code'],
  });

  return client;
}
