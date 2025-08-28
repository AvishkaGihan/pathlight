"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { volunteerSchema } from "@/lib/validations";

export async function signupVolunteer(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) return { error: "Unauthorized" };

  const data = Object.fromEntries(formData);
  const parsed = volunteerSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid input" };

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return { error: "User not found" };

  await db.$transaction([
    db.volunteerRegistration.create({
      data: { userId: user.id, conservationProjectId: parsed.data.projectId },
    }),
    db.conservationProject.update({
      where: { id: parsed.data.projectId },
      data: { registeredCount: { increment: 1 } },
    }),
  ]);

  revalidatePath("/conservation");
  revalidatePath("/profile");
  return { success: true };
}
