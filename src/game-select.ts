import { Game } from "./model/game.ts";
import { i18n } from "./translations.ts";

export class GameSelect extends HTMLElement {
  constructor(games: Game[], handleSelect: (game: Game | undefined) => void) {
    super();

    const select = document.createElement("select");

    const placeholder = new Option(`-- ${i18n("selectGame")} --`, "");

    placeholder.disabled = true;
    placeholder.selected = true;

    select.add(placeholder);
    select.add(new Option(`${i18n("graphicTypeOverview")}`, ""));

    for (const game of games) {
      const label = `${game.league?.toUpperCase()}: ${
        game.date
      } (${game.times.join(", ")}): ${game.home} vs. ${game.away}`;

      select.add(new Option(label, game.id));
    }

    select.addEventListener("change", () => {
      if (select.value === "") {
        handleSelect(undefined);
      } else {
        const selectedGame = games.find((game) => game.id === select.value);

        if (selectedGame) {
          handleSelect(selectedGame);
        }
      }
    });

    return select;
  }
}

window.customElements.define("game-select", GameSelect);
