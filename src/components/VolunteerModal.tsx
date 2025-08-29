"use client";

import { useActionState, useEffect } from "react";
import { signupVolunteer } from "@/actions/volunteer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function VolunteerModal({
  project,
}: {
  project: { id: string; title: string; description: string };
}) {
  const { data: session, update } = useSession();
  const [state, action, isPending] = useActionState(signupVolunteer, {
    error: "",
  });

  const handleSubmit = async (formData: FormData) => {
    action(formData);
  };

  // Handle state changes from the action
  useEffect(() => {
    if (state.success) {
      toast("Volunteered! +100 points");
      const newPoints = (session?.user?.points || 0) + 100;
      update({ points: newPoints });
    } else if (state.error && state.error !== "") {
      toast("Error: " + state.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Volunteer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm</DialogTitle>
        </DialogHeader>
        <p>
          Join "{project.title}"? {project.description}
        </p>
        <form action={handleSubmit}>
          <input type="hidden" name="projectId" value={project.id} />
          <Button type="submit" disabled={isPending}>
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
