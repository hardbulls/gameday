import {
  drawImage,
  drawRoundedLeftSquare,
  drawRoundedRightSquare,
} from "../draw.ts";
import { DrawOptions } from "../model/DrawOptions.ts";
import { TeamRepository } from "../repository/team-repository.ts";

export async function drawGame(
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
    const timeOffsetX = (game.times.length - 1) * 120;

    drawRoundedLeftSquare(
      ctx,
      offsetX,
      gamesOffset + offsetY,
      126 + timeOffsetX,
      boxHeight,
      20,
      4,
      "#ffffff",
    );

    ctx.fillStyle = "#ffffff";

    drawRoundedRightSquare(
      ctx,
      offsetX + 126 + timeOffsetX,
      gamesOffset + offsetY,
      622 - timeOffsetX,
      boxHeight,
      20,
      4,
      "#ffffff",
    );

    ctx.fill();

    ctx.font = `${gameFontSize}px DIN Condensed Bold`;
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "right";

    ctx.fillText(
      `${game.times[0]}`,
      106 + offsetX,
      gamesOffset + gameFontSize + offsetY + 5,
    );

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";

    if (game.times.length > 1) {
      ctx.font = `${gameFontSize}px DIN Condensed`;
      ctx.fillText(
        `|`,
        114 + offsetX,
        gamesOffset + gameFontSize + offsetY + 5,
      );
      ctx.font = `${gameFontSize}px DIN Condensed Bold`;

      ctx.fillText(
        `${game.times[1]}`,
        114 + offsetX + 26,
        gamesOffset + gameFontSize + offsetY + 5,
      );
    }

    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";

    const teamsDisplay = `${game.home} vs. ${game.away}${
      game.league && !options.hiddenLeagues.includes(game.league)
        ? ` (${game.league.toUpperCase()})`
        : ""
    }`;

    ctx.fillText(teamsDisplay, 320, gamesOffset + gameFontSize + offsetY + 5);

    ctx.textAlign = "right";

    const homeTeam = TeamRepository.findTeam(game.home);
    const awayTeam = TeamRepository.findTeam(game.away);

    const logoOffsetY = gamesOffset + offsetY + 130;
    const logoOffsetX = 200;
    const logoSize = 150;

    ctx.font = "82px Neue Aachen";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText("vs", logoOffsetX + logoSize * 2, logoOffsetY + 100);
    ctx.fillStyle = "#000000";

    await drawImage(
      ctx,
      homeTeam.logo,
      logoOffsetX,
      logoOffsetY,
      logoSize,
      logoSize,
    );
    await drawImage(
      ctx,
      awayTeam.logo,
      logoOffsetX + logoSize + 150,
      logoOffsetY,
      logoSize,
      logoSize,
    );
  }
}
