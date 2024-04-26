import {
  drawImage,
  drawRoundedLeftSquare,
  drawRoundedRightSquare,
  rotateCanvas,
} from "../draw.ts";
import BullPng from "../assets/bull.png";
import HomePlateOvarlay from "../assets/overlay/home_plate_overlay.png";
import BlackGradientOvarlay from "../assets/overlay/black_gradient_overlay.png";
import { BULLS_COLOR } from "../config.ts";
import { DrawOptions } from "../model/DrawOptions.ts";

async function drawOverviewGames(
  ctx: CanvasRenderingContext2D,
  options: DrawOptions,
) {
  const gamesOffset = 580;
  const gameFontSize = 48;

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
      106 + offsetX,
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
        122 + offsetX + 82,
        gamesOffset + gameFontSize + offsetY + 5,
      );
      ctx.font = `${gameFontSize}px DIN Condensed Bold`;

      ctx.fillText(
        `${game.times[1]}`,
        120 + offsetX + 100,
        gamesOffset + gameFontSize + offsetY + 5,
      );
    }

    ctx.textAlign = "right";

    const teamsDisplay = `${game.home} vs. ${game.away}${
      game.league && !options.hiddenLeagues.includes(game.league)
        ? ` (${game.league.toUpperCase()})`
        : ""
    }`;
    ctx.fillText(teamsDisplay, 770, gamesOffset + gameFontSize + offsetY + 5);
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

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";

  if (options.background) {
    await drawImage(ctx, options.background, 0, 0, 900, 450);

    ctx.globalCompositeOperation = "source-over";

    await drawImage(ctx, HomePlateOvarlay, 0, 450, 900, 900);
    await drawImage(ctx, BlackGradientOvarlay, 0, 450, 900, 900);

    ctx.globalAlpha = 0.4;
    ctx.globalCompositeOperation = "overlay";

    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 30;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 450, canvas.width, canvas.height - 450);

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

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
