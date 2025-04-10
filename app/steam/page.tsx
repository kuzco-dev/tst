// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Se connecter avec Steam</h1>
      <Link href="http://localhost:3000/api/auth/steam">
        <button>Se connecter avec Steam</button>
      </Link>
    </div>
  );
}
