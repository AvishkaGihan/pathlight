// src/app/profile/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type {
  Booking,
  VolunteerRegistration,
  Accommodation,
  Restaurant,
  ConservationProject,
} from "@prisma/client";

type BookingWithRelations = Booking & {
  accommodation: Accommodation | null;
  restaurant: Restaurant | null;
};

type VolunteerRegistrationWithProject = VolunteerRegistration & {
  conservationProject: ConservationProject;
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const [bookings, projects] = await Promise.all([
    db.booking.findMany({
      where: { userId: session.user.id },
      include: {
        accommodation: true,
        restaurant: true,
      },
    }),
    db.volunteerRegistration.findMany({
      where: { userId: session.user.id },
      include: { conservationProject: true },
    }),
  ]);

  const points = (session.user as any)?.points || 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="avatar"
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{session.user.name}</h1>
          <p className="text-sm text-muted-foreground">{points} eco-points</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Badges</h2>
        <div className="flex gap-2 flex-wrap">
          {projects.map((p: VolunteerRegistrationWithProject) => (
            <Badge key={p.id}>{p.conservationProject.title}</Badge>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Past Bookings</h2>
        <ul className="space-y-2">
          {bookings.map((b: BookingWithRelations) => (
            <li key={b.id} className="border p-2 rounded">
              {b.accommodation?.name || b.restaurant?.name} –{" "}
              {b.bookedAt.toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
