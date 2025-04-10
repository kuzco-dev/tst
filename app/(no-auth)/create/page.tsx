// Ajoute cette ligne en haut de ton fichier
"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/auth";

export default function CreatePage() {
    const [session, setSession] = useState(null);
    const [pseudo, setPseudo] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fonction pour envoyer les données au backend
    const createBanner = async () => {

        const res = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pseudo,
                description,
            }),
        });

        const data = await res.json();
        if (res.status === 200) {
            setSuccessMessage('Bannière créée avec succès !');
            setErrorMessage('');
        } else {
            setErrorMessage(data.message || 'Erreur lors de la création de la bannière');
            setSuccessMessage('');
        }
    };


    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Bienvenue sur la page de création 🎨</h1>
            <p className="mt-4 text-gray-600">Tu peux maintenant commencer à créer ta bannière ou ton contenu.</p>

            {/* Afficher les messages de succès ou d'erreur */}
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
            {successMessage && <div className="text-green-600">{successMessage}</div>}

            {/* Formulaire de création de bannière */}
            <div className="mt-8">
                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        id="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    onClick={createBanner}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Créer la bannière
                </button>
            </div>
        </div>
    );
}
