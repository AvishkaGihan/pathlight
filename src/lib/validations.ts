import { z } from "zod";

export const bookingSchema = z.object({
  placeId: z.string(),
  placeType: z.enum(["ACCOMMODATION", "RESTAURANT"]),
  checkIn: z.date(),
  checkOut: z.date().optional(),
  userEmail: z.string().email(),
});

export const volunteerSchema = z.object({
  projectId: z.string(),
});
