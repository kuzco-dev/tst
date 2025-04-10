import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/lib/auth";  // Importer la configuration de Better Auth
import { PrismaClient } from '@prisma/client';
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    // Récupérer la session active de l'utilisateur
    const session = await auth.api.getSession({
        headers: await headers() // Passe les en-têtes pour récupérer la session
    });

    console.log(session);

    // Vérifier si la session est valide
    if (!session || !session.session.userId) {
        return NextResponse.json({ message: "Utilisateur non autorisé" }, { status: 401 });
    }

    // Extraire les données du corps de la requête (pseudo, description)
    const { pseudo, description } = await req.json();

    // Validation des données reçues
    if (!pseudo || !description) {
        return NextResponse.json({ message: "Les champs pseudo et description sont requis" }, { status: 400 });
    }

    try {
        // Créer une nouvelle bannière pour l'utilisateur connecté
        const banner = await prisma.banner.create({
            data: {
                userId: session?.session.userId,  // Utiliser l'ID de l'utilisateur connecté
                pseudo,
                description,
            },
        });

        // Réponse avec la bannière créée
        return NextResponse.json(banner, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erreur lors de la création de la bannière" }, { status: 500 });
    }
}
