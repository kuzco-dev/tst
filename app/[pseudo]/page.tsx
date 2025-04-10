// app/[pseudo]/page.tsx

import { notFound } from "next/navigation";
import { PrismaClient } from '@prisma/client';

interface PageProps {
  params: {
    pseudo: string;
  };
}

export default async function BannerPage({ params }: PageProps) {
    const prisma = new PrismaClient();

  const banner = await prisma.banner.findUnique({
    where: { pseudo: params.pseudo }
  });

  if (!banner) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">{banner.pseudo}</h1>
      <p className="text-gray-600 mt-2">{banner.description}</p>
      <img src={banner.url} alt="Girl in a jacket" width="500" height="600"/>
    </main>
  );
}
