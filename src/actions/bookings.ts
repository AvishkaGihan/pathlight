"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookingSchema } from "@/lib/validations";

export async function createBooking(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) return { error: "Unauthorized" };

  const data = Object.fromEntries(formData);
  const parsed = bookingSchema.safeParse({
    ...data,
    checkIn: new Date(data.checkIn as string),
    checkOut: data.checkOut ? new Date(data.checkOut as string) : undefined,
  });
  if (!parsed.success) return { error: "Invalid input" };

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return { error: "User not found" };

  await db.booking.create({
    data: { userId: user.id, ...parsed.data },
  });

  revalidatePath("/profile"); // Invalidate cache (**Checklist #5**)
  return { success: true };
}
