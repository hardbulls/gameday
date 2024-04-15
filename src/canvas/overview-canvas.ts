import {
  drawImage,
  drawRoundedLeftSquare,
  drawRoundedRightSquare,
  rotateCanvas,
} from "../draw.ts";
import BullPng from "../assets/bull.png";
import { BULLS_COLOR } from "../config.ts";
import { DrawOptions } from "../model/DrawOptions.ts";

async function drawOverviewGames(
  ctx: CanvasRenderingContext2D,
  options: DrawOptions,
) {
  const gamesOffset = 580;

  for (const [index, game] of Object.entries(options.games)) {
    const row = Number.parseInt(index);
    const spacing = row > 0 ? 18 * row : 0;
    const offsetY = row * 70 + spacing;
    const offsetX = 24;

    drawRoundedLeftSquare(
      ctx,
      offsetX,
      gamesOffset + offsetY,
      112,
      70,
      20,
      3,
      "#ffffff",
    );

    ctx.fillStyle = "#ffffff";

    drawRoundedRightSquare(
      ctx,
      offsetX + 112,
      gamesOffset + offsetY,
      652,
      70,
      20,
      3,
      "#ffffff",
    );

    ctx.fill();

    const gameFontSize = 60;

    ctx.font = `${gameFontSize}px Steelfish`;
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "right";

    const date = new Date(game.date);

    ctx.fillText(
      `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.`,
      102 + offsetX,
      gamesOffset + gameFontSize + offsetY,
    );

    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";

    ctx.fillText(
      `${game.times[0]}`,
      117 + offsetX,
      gamesOffset + gameFontSize + offsetY,
    );

    if (game.times.length > 1) {
      ctx.fillText(
        `|`,
        122 + offsetX + 82,
        gamesOffset + gameFontSize + offsetY,
      );

      ctx.fillText(
        `${game.times[1]}`,
        119 + offsetX + 100,
        gamesOffset + gameFontSize + offsetY,
      );
    }

    ctx.textAlign = "right";

    const teamsDisplay = `${game.home} vs. ${game.away}${
      game.league && !options.hiddenLeagues.includes(game.league)
        ? ` (${game.league.toUpperCase()})`
        : ""
    }`;
    ctx.fillText(teamsDisplay, 770, gamesOffset + gameFontSize + offsetY);
  }
}

export async function renderCanvas(
  outputImage: HTMLImageElement,
  canvas: HTMLCanvasElement,
  options: DrawOptions,
): Promise<HTMLImageElement> {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = 900;
  canvas.height = 1600;

  if (typeof ctx.reset === "function") {
    ctx.reset();
  }

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (options.background) {
    await drawImage(ctx, options.background, 0, 0, 900, 450);

    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 30;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 450, canvas.width, canvas.height - 450);

    ctx.shadowBlur = 0;
    ctx.shadowColor = "rgba(0,0,0,0)";
  }

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.strokeRect(50, 50, 700, 350);

  await drawImage(ctx, BullPng, -140, 60, 500, 500);

  ctx.fillStyle = "#ffffff";
  ctx.font = "96px Neue Aachen";
  ctx.fillText("GAME DAY", 320, 545);

  ctx.fillStyle = BULLS_COLOR;
  ctx.fillRect(canvas.width - 100, 0, 100, 680);

  ctx.beginPath();
  ctx.moveTo(900, 680);
  ctx.lineTo(800, 680);
  ctx.lineTo(800, 780);
  ctx.fill();

  rotateCanvas(ctx, -90);

  ctx.fillStyle = "#ffffff";
  ctx.font = "82px Neue Aachen";
  ctx.fillText("BALLPARK HARD", -665, canvas.width - 22);

  rotateCanvas(ctx, 90);

  await drawOverviewGames(ctx, options);

  outputImage.src = canvas.toDataURL("image/png");

  return outputImage;
}
