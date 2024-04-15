import { Game } from "./game.ts";

export type DrawOptions = {
  background?: string;
  games: Game[];
  hiddenLeagues: string[];
};
