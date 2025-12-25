import { Input } from "@/components/ui/input";
import { useMobs } from "@/lib/useMobs";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ParticipantList } from "@/components/participant-list";
import { ReceptParticipants } from "@/components/recent-participants";
import { SettingsButton } from "@/components/settings-dropdown";
import { Timer } from "@/components/timer";
import Controls from "@/components/controls";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/m/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const [error, setError] = useState<string | null>(null);
  const params = Route.useParams();
  const navigate = Route.useNavigate();
  const { addParticipant, participants, mobs, updateParticipants } = useMobs();

  useEffect(() => {
    if (!mobs.map((mob) => mob.id).includes(params.id)) {
      navigate({ to: "/" });
    }
  }, [mobs]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const names = Array.from(formData.values()).filter(Boolean) as string[];
    const newName = formData.get("add") as string;

    if (newName) {
      const { error } = addParticipant(newName);
      setError(error);
      if (!error) {
        (e.currentTarget as HTMLFormElement).reset();
      }
    }

    if (!newName) {
      const existingNames =
        participants?.map((participant) => participant.name) ?? [];
      // Check if the arrays contain the same participants
      const identical =
        existingNames.length === names.length &&
        existingNames.every((name) => names.includes(name));

      if (!identical) {
        updateParticipants(names);
      }
    }
  };

  return (
    <div className="border-muted border w-full rounded-md flex flex-col items-center justify-center gap-4 pb-4 px-4">
      <header className="grid grid-cols-3 items-center  w-full py-2 px-4">
        <div />
        <Timer />
        <SettingsButton />
      </header>

      <div className="flex flex-col gap-8">
        <Controls />
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {participants && <ParticipantList participants={participants} />}

          <div className="mt-4 h-[1px] bg-muted" />
          <div className="mt-4 pb-8 relative">
            {error && (
              <p className="text-red-500 text-xs absolute bottom-[100%] pb-1">
                {error}
              </p>
            )}
            <div className="flex flex-row gap-1 relative">
              <Input id="add" name="add" placeholder="add participant" />
              <Button variant="outline" type="submit">
                add
              </Button>

              <ReceptParticipants className="absolute top-full pt-2" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
