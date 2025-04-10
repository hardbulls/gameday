import { drawImage } from "../draw.ts";
import BullPng from "../assets/bull.png";
import HomePlateOvarlay from "../assets/overlay/home_plate_overlay.png";
import BlackGradientOvarlay from "../assets/overlay/black_gradient_overlay.png";
import { DrawOptions } from "../model/DrawOptions.ts";

export async function drawBase(
  ctx: CanvasRenderingContext2D,
  options: DrawOptions,
) {
  const canvas = ctx.canvas;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";

  if (options.background) {
    await drawImage(ctx, options.background, 0, 0, 900, 450);

    ctx.globalCompositeOperation = "source-over";

    await drawImage(ctx, HomePlateOvarlay, 0, 400, 900, 900);
    await drawImage(ctx, BlackGradientOvarlay, 0, 400, 900, 900);

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
  ctx.fillText(options.title.toUpperCase(), 320, 545);
}
