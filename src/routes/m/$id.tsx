import { Input } from "@/components/ui/input";
import { useMobs } from "@/lib/useMobs";

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ParticipantList } from "@/components/participant-list";
import { ReceptParticipants } from "@/components/recent-participants";
import { SettingsButton } from "@/components/settings-dropdown";
import { useAnimate } from "motion/react";
import { Timer } from "@/components/timer";

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
    <div className="bg-gray-50 shadow-lg dark:bg-zinc-900 w-full rounded-xl px-4 py-4 flex flex-col items-center justify-center">
      <header className="flex items-center justify-center pb-10 pt-10 w-full">
        <GoBackButton />
        <SettingsButton />
        <Timer />
      </header>

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {participants && <ParticipantList participants={participants} />}

          <div className="mt-4 h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          <div className="mt-4 pb-8 relative">
            {error && (
              <p className="text-red-500 text-xs absolute bottom-[100%] pb-1">
                {error}
              </p>
            )}
            <div className="flex flex-row gap-1 relative">
              <Input id="add" name="add" placeholder="Add participant" />
              <button
                type="submit"
                className="hidden hover:scale-[1.1] transition-transform"
              >
                <PlusCircle strokeWidth={1} />
              </button>
              <ReceptParticipants className="absolute top-full" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function GoBackButton() {
  const [ref, animate] = useAnimate();

  return (
    <Link
      to="/"
      className="group absolute left-4 top-4 flex flex-row justify-center gap-1"
      onMouseOver={() =>
        animate(ref.current, {
          x: [null, -8, 0],
          ease: "easeInOut",
          duration: 0.1,
        })
      }
      onMouseOut={() => animate(ref.current, { x: 0 })}
    >
      <ArrowLeft ref={ref} />
      Go back
    </Link>
  );
}
