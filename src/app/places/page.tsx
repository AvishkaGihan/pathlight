import { db } from "@/lib/db";
import { calculateEcoScore } from "@/lib/eco-score";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const colorMap = {
  red: "destructive",
  amber: "secondary",
  green: "default",
} as const;

const PlacesPage = async () => {
  const accs = await db.accommodation.findMany();
  const rests = await db.restaurant.findMany();
  const places = [
    ...accs.map((a) => ({ ...a, placeType: "ACCOMMODATION" })),
    ...rests.map((r) => ({ ...r, placeType: "RESTAURANT" })),
  ];

  const enriched = places.map((p) => {
    const eco = calculateEcoScore({
      energyEfficiency: 85, // Hardcoded
      wasteManagement: 80,
      waterConservation: 75,
      certifications: Array.isArray(p.certifications)
        ? (p.certifications as string[])
        : [],
    });
    return {
      id: p.id,
      name: p.name,
      location: p.location,
      overallScore: eco.overallScore,
      color: eco.color,
    };
  });

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {enriched.map((p) => (
        <Link key={p.id} href={`/places/${p.id}`}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
              <Badge variant={colorMap[p.color as keyof typeof colorMap]}>
                {p.overallScore}
              </Badge>
            </CardHeader>
            <CardContent>
              <p>{p.location}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
};

export default PlacesPage;
