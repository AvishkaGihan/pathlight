import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { VolunteerModal } from "@/components/VolunteerModal";

export default async function ConservationPage() {
  const projects = await db.conservationProject.findMany({
    where: {
      registeredCount: { lt: db.conservationProject.fields.maxVolunteers },
    },
  });

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <Card key={p.id}>
          <CardHeader>
            <CardTitle>{p.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{p.location}</p>
            <Progress
              value={(p.registeredCount / p.maxVolunteers) * 100}
              className="mb-2"
            />
            <p className="text-sm mb-4">
              {p.registeredCount} / {p.maxVolunteers} volunteers
            </p>
            <VolunteerModal
              project={{ id: p.id, title: p.title, description: p.description }}
            />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
