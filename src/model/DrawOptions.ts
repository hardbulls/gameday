import { Game } from "./game.ts";
import { RenderType } from "./RenderType.ts";

export type DrawOptions = {
  background?: string;
  title: string;
  games: Game[];
  hiddenLeagues: string[];
  type: RenderType;
};
