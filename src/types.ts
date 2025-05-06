export type Mob = {
  id: string;
  participants: Participant[];
};

export type Participant = {
  name: string;
  active?: boolean;
};
