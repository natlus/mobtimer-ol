import { useMobs } from "@/lib/useMobs";
import { cn } from "@/lib/utils";

export function ReceptParticipants({ className }: { className?: string }) {
  const { recentParticipants, addParticipant, participants } = useMobs();

  const suggestions = participants?.length
    ? recentParticipants.filter(
        (participant) =>
          !participants?.map((p) => p.name).includes(participant),
      )
    : recentParticipants;

  if (!suggestions.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-1 py-2 text-xs", className)}>
      Suggestions:
      {suggestions.map((participant) => (
        <button
          onClick={() => {
            addParticipant(participant);
          }}
          key={participant}
          className="hover:underline"
        >
          {participant}
          {suggestions.indexOf(participant) < suggestions.length - 1 && ","}
        </button>
      ))}
    </div>
  );
}
