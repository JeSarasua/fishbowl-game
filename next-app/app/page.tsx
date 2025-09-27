import Image from 'next/image';
import Link from 'next/link';
import ProductCard from './components/ProductCard';

export default function Home() {
  return (
    <main>
      <h1>Welcome to fishbowl</h1>

      <Link href="/game">Create a new game</Link>
    </main>
  );
}
