import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-5xl font-bold mb-4">Travel Sustainably</h1>
      <p className="max-w-xl mb-6 text-lg text-muted-foreground">
        Discover eco-friendly accommodations, restaurants, and conservation
        projects that make a difference.
      </p>
      <Link href="/places">
        <Button size="lg">Browse Eco-Places</Button>
      </Link>
    </section>
  );
}
