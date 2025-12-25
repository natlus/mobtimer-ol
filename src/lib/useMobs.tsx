import { useAtom } from "jotai";
import { mobsAtom, recentParticipantsAtom } from "./state";
import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { animals } from "@/lib/animals";
import { Mob, Participant } from "@/types";

export function useMobs() {
  const [mobs] = useAtom(mobsAtom);
  const [recentParticipants] = useAtom(recentParticipantsAtom);

  const { create, remove } = useCreateDelete();
  const { id } = useParams({ strict: false });
  const {
    addParticipant,
    removeParticipant,
    updateParticipants,
    changeOrder,
    setDriver,
  } = useUpdate(id);

  useEffect(() => {
    const current = mobs.find((mob) => mob.id === id);
    if (!current) return;

    if (!current.participants?.find((p) => p.active)) {
      // set first participant as driver if there is none
      setDriver(current.participants?.[0]);
    }
  }, [id]);

  return {
    mobs,
    create,
    remove,
    addParticipant,
    removeParticipant,
    updateParticipants,
    setDriver,
    changeOrder,
    participants: mobs.find((mob) => mob.id === id)?.participants,
    currentMob: mobs.find((mob) => mob.id === id),
    recentParticipants,
  };
}

function useUpdate(id?: string) {
  const [mobs, setMobs] = useAtom(mobsAtom);
  const [recentParticipants, setRecentParticipants] = useAtom(
    recentParticipantsAtom,
  );

  function setDriver(participant: Participant) {
    const current = mobs.find((mob) => mob.id === id);
    if (!current) return { error: `Mob ${id} not found` };

    // Set the participant as active
    const updatedParticipants = current.participants?.map((p) => {
      // Reset active status for all participants
      return { ...p, active: p.name === participant.name };
    });

    current.participants = updatedParticipants;

    // Create a new array with the updated mob
    const newMobs = mobs.map((mob) => (mob.id === id ? current : mob));

    setMobs([...newMobs]);
    return { error: null };
  }

  function addParticipant(name: string) {
    const current = mobs.find((mob) => mob.id === id);
    if (!current) return { error: `Mob ${id} not found` };

    if (!name) {
      return { error: `Name cannot be empty` };
    }

    if (
      current.participants?.find((participant) => participant.name === name)
    ) {
      return { error: `Participant ${name} already exists in mob ${id}` };
    }
    // Add the new participant to the current mob
    current.participants = [...(current.participants || []), { name }];

    // Create a new array with the updated mob
    const newMobs = mobs.map((mob) => (mob.id === id ? current : mob));

    console.log(`Added participant ${name} to mob ${id}`);
    setMobs([...newMobs]);
    setRecentParticipants(
      [...new Set([...recentParticipants, name])].filter(
        (_, i) => i > recentParticipants.length - 10,
      ),
    );
    return { error: null };
  }

  function removeParticipant(name: string) {
    const current = mobs.find((mob) => mob.id === id);
    if (!current) return;

    const participantToBeRemoved = current.participants.find(
      (p) => p.name === name,
    );

    if (participantToBeRemoved?.active) {
      const nextIndex =
        current.participants.findIndex((p) => p.name === name) + 1;
      setDriver(
        current.participants[
          nextIndex > current.participants.length - 1 ? 0 : nextIndex
        ],
      );
    }
    // Filter out the participant to remove
    current.participants = current.participants.filter(
      (participant) => participant.name !== name,
    );

    // Create a new array with the updated mob
    const newMobs = mobs.map((mob) => (mob.id === id ? current : mob));

    console.log(`Removed participant ${name} to mob ${id}`);
    setMobs([...newMobs]);
  }

  function changeOrder(newOrder: string[]) {
    const current = mobs.find((mob) => mob.id === id);
    if (!current) return;

    // Reorder the participants array based on the new order
    const orderedParticipants = newOrder
      .map((name) =>
        current.participants.find((participant) => participant.name === name),
      )
      .filter(Boolean); // Filter out any undefined values (in case newOrder contains names not in the participants)

    // Update the current mob with the new order
    current.participants = orderedParticipants.filter((i) => i !== undefined);

    // Create a new array with the updated mob
    const newMobs = mobs.map((mob) => (mob.id === id ? current : mob));

    console.log(`Reordered participants in mob ${id}`);
    setMobs([...newMobs]);
  }

  function updateParticipants(names: string[]) {
    // Check if the mob exists
    const current = mobs.find((mob) => mob.id === id);
    if (!current) return { error: `Mob ${id} not found` };

    // Create participant objects from the names
    const updatedParticipants = names.map((name) => {
      // Preserve active status if participant already exists
      const existingParticipant = current.participants.find(
        (p) => p.name === name,
      );
      return existingParticipant || { name };
    });

    // Update the current mob with the new participants
    current.participants = updatedParticipants;

    // Create a new array with the updated mob
    const newMobs = mobs.map((mob) => (mob.id === id ? current : mob));

    console.log(`Updated participants in mob ${id}`);
    setMobs([...newMobs]);
  }

  return {
    addParticipant,
    removeParticipant,
    updateParticipants,
    changeOrder,
    setDriver,
  };
}

function useCreateDelete() {
  const [mobs, setMobs] = useAtom(mobsAtom);

  const generateHash = () => {
    const randomIndex = Math.floor(Math.random() * animals.length);
    return animals[randomIndex];
  };

  function create(mob?: Mob) {
    console.log("Creating mob...");

    const generateUniqueId = (): string => {
      const newId = generateHash();
      if (mobs.map((mob) => mob.id).includes(newId)) {
        console.log(
          `Mob with ID ${newId} already exists, generating a new one`,
        );
        return generateUniqueId(); // Recursively try again
      }
      return newId;
    };

    const id = generateUniqueId();

    if (mob) {
      console.log(
        `Creating mob with ID ${id} and participants ${mob.participants}`,
      );
      setMobs([...mobs, { ...mob, id }]);
    } else {
      console.log(`Creating mob with ID ${id} and no participants`);
      setMobs([...mobs, { id, participants: [] }]);
    }

    return id;
  }

  function remove(id: string) {
    setMobs(mobs.filter((mob) => mob.id !== id));
  }

  return { create, remove };
}
