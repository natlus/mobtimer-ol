import { Participant } from "@/types";
import { Input } from "./ui/input";
import { useMobs } from "@/lib/useMobs";
import { GripVertical, Trash2 } from "lucide-react";

import { Reorder, useDragControls } from "motion/react";
import { cn } from "@/lib/utils";

export function ParticipantList({
  participants,
}: {
  participants: Participant[];
}) {
  const { changeOrder, setDriver } = useMobs();

  function handleReorder(items: string[]) {
    const driverIndex = participants.findIndex((p) => p.active);
    const currentDriver = participants.find((p) => p.active) ?? participants[0];
    setDriver(
      participants.find((p) => p.name === items[driverIndex]) ?? currentDriver,
    );
    changeOrder(items);
  }

  const items = participants.map((p) => p.name);

  return (
    <>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="flex flex-col gap-2"
      >
        {items?.map((item) => <DraggableInput id={item} key={item} />)}
      </Reorder.Group>
    </>
  );
}

function DraggableInput({ id }: { id: string }) {
  const controls = useDragControls();
  const { removeParticipant, participants } = useMobs();

  const { active } = participants?.find((p) => p.name === id) ?? {};

  return (
    <Reorder.Item value={id} dragListener={false} dragControls={controls}>
      <div className="flex flex-row justify-center items-center gap-1">
        <GripVertical
          className="cursor-grab active:cursor-grabbing"
          strokeWidth={1}
          onPointerDown={(e) => controls.start(e)}
        />
        <Input
          id={id.trim()}
          name={id.trim()}
          defaultValue={id.trim()}
          className={cn(active && "border-orange")}
        />
        <button
          type="button"
          className="hover:text-orange transition-color duration-200"
          onClick={(e) => {
            e.stopPropagation();
            removeParticipant(id);
          }}
        >
          <Trash2 size={20} strokeWidth={1} />
        </button>
      </div>
    </Reorder.Item>
  );
}
