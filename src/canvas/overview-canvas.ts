import { drawRoundedLeftSquare, drawRoundedRightSquare } from "../draw.ts";
import { DrawOptions } from "../model/DrawOptions.ts";

export async function drawOverviewGames(
  ctx: CanvasRenderingContext2D,
  options: DrawOptions,
) {
  const gamesOffset = 580;
  const gameFontSize = 40;

  for (const [index, game] of Object.entries(options.games)) {
    const row = Number.parseInt(index);
    const boxHeight = gameFontSize * 1.5;
    const spacing = row > 0 ? 48 * row : 0;
    const offsetY = row * gameFontSize + spacing;
    const offsetX = 20;

    drawRoundedLeftSquare(
      ctx,
      offsetX,
      gamesOffset + offsetY,
      116,
      boxHeight,
      20,
      4,
      "#ffffff",
    );

    ctx.fillStyle = "#ffffff";

    drawRoundedRightSquare(
      ctx,
      offsetX + 116,
      gamesOffset + offsetY,
      652,
      boxHeight,
      20,
      4,
      "#ffffff",
    );

    ctx.fill();

    ctx.font = `${gameFontSize}px DIN Condensed Bold`;
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "right";

    const date = new Date(game.date);

    ctx.fillText(
      `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.`,
      98 + offsetX,
      gamesOffset + gameFontSize + offsetY + 5,
    );

    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";

    ctx.fillText(
      `${game.times[0]}`,
      120 + offsetX,
      gamesOffset + gameFontSize + offsetY + 5,
    );

    if (game.times.length > 1) {
      ctx.font = `${gameFontSize}px DIN Condensed`;
      ctx.fillText(
        `|`,
        114 + offsetX + 76,
        gamesOffset + gameFontSize + offsetY + 5,
      );
      ctx.font = `${gameFontSize}px DIN Condensed Bold`;

      ctx.fillText(
        `${game.times[1]}`,
        114 + offsetX + 90,
        gamesOffset + gameFontSize + offsetY + 5,
      );
    }

    ctx.textAlign = "right";

    const teamsDisplay = `${game.home} vs. ${game.away}${
      game.league && !options.hiddenLeagues.includes(game.league)
        ? ` (${game.league.toUpperCase()})`
        : ""
    }`;
    ctx.fillText(teamsDisplay, 772, gamesOffset + gameFontSize + offsetY + 5);
  }
}
