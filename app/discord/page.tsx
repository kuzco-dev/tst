// app/discord/page.tsx
'use client';

import React, { useState } from 'react';

const DiscordPage = () => {
  const [loading, setLoading] = useState(false);

  // Fonction pour appeler l'API et obtenir l'URL de redirection Discord
  const handleRedirect = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/discord');
      const data = await response.json();

      if (data.url) {
        // Redirige vers l'URL Discord
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'URL de redirection Discord', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Connecte-toi avec Discord</h1>
      <p>Click below to login with Discord:</p>
      <button onClick={handleRedirect} disabled={loading}>
        {loading ? 'Redirection...' : 'Se connecter avec Discord'}
      </button>
    </div>
  );
};

export default DiscordPage;
