"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bookingSchema } from "@/lib/validations";
import { createBooking } from "@/actions/bookings";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

type FormData = z.infer<typeof bookingSchema>;

export function BookingForm({
  placeId,
  placeType,
}: {
  placeId: string;
  placeType: "ACCOMMODATION" | "RESTAURANT";
}) {
  const { data: session } = useSession();
  const [state, action, isPending] = useActionState(createBooking, null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      userEmail: session?.user?.email || "",
      placeId,
      placeType,
    },
  });

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    action(formData);
  };

  if (state?.success) toast.success("Booking confirmed!");
  if (state?.error) toast.error(state.error);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Book now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book this place</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("userEmail")} placeholder="Guest email" />
          {errors.userEmail && (
            <p className="text-sm text-red-600">{errors.userEmail.message}</p>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {watch("checkIn")
                  ? format(watch("checkIn"), "PPP")
                  : "Pick check-in date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={watch("checkIn")}
                onSelect={(d) => d && setValue("checkIn", d)}
              />
            </PopoverContent>
          </Popover>

          {placeType === "ACCOMMODATION" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("checkOut")
                    ? format(watch("checkOut")!, "PPP")
                    : "Pick check-out date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={watch("checkOut")}
                  onSelect={(d) => d && setValue("checkOut", d)}
                />
              </PopoverContent>
            </Popover>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            Confirm booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
