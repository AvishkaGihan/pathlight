import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { calculateEcoScore } from "@/lib/eco-score";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookingForm } from "@/components/BookingForm";

async function getPlace(id: string) {
  const acc = await db.accommodation.findUnique({ where: { id } });
  const rest = acc ? null : await db.restaurant.findUnique({ where: { id } });
  if (!acc && !rest) return null;
  const place = acc || rest!;
  const eco = calculateEcoScore({
    energyEfficiency: 85,
    wasteManagement: 80,
    waterConservation: 75,
    certifications: (place.certifications as string[]) || [],
  });
  return {
    ...place,
    placeType: (acc ? "ACCOMMODATION" : "RESTAURANT") as
      | "ACCOMMODATION"
      | "RESTAURANT",
    eco,
  };
}

export default async function PlacePage({
  params,
}: {
  params: { id: string };
}) {
  const place = await getPlace(params.id);
  if (!place) notFound();
  const images = (place.images as string[]) || [];

  const pillars = [
    { label: "Energy", score: 85 },
    { label: "Waste", score: 80 },
    { label: "Water", score: 75 },
  ];

  return (
    <section className="space-y-6">
      <div className="flex gap-4">
        {images.map((src, i) => (
          <div key={i} className="relative w-96 h-64">
            <Image
              src={src}
              alt={`img-${i}`}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold">{place.name}</h1>

      <div className="flex items-center gap-2">
        <Badge className="text-lg">{place.eco.overallScore}</Badge>
        <span className="text-sm">{place.eco.color}</span>
      </div>

      <div className="space-y-4">
        {pillars.map((p) => (
          <div key={p.label}>
            <div className="flex justify-between text-sm">
              <span>{p.label}</span>
              <span>{p.score}%</span>
            </div>
            <Progress value={p.score} />
          </div>
        ))}
      </div>

      <BookingForm placeId={place.id} placeType={place.placeType} />
    </section>
  );
}
