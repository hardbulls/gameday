import { rotateCanvas } from "../draw.ts";
import { BULLS_COLOR } from "../config.ts";

export async function drawRibbon(ctx: CanvasRenderingContext2D, text: string) {
  const canvas = ctx.canvas;
  const ribbonHeight = 680;
  const ribbonWidth = 100;

  ctx.fillStyle = BULLS_COLOR;
  ctx.fillRect(canvas.width - 100, 0, ribbonWidth, ribbonHeight);

  ctx.beginPath();
  ctx.moveTo(900, ribbonHeight);
  ctx.lineTo(800, ribbonHeight);
  ctx.lineTo(800, 780);
  ctx.fill();

  rotateCanvas(ctx, -90);

  ctx.fillStyle = "#ffffff";
  ctx.font = "82px Neue Aachen";
  const textWidth = ctx.measureText(text.toUpperCase()).width;
  ctx.fillText(
    text.toUpperCase(),
    -(canvas.height - ribbonHeight - textWidth) / 2 + 110,
    canvas.width - 22,
  );

  rotateCanvas(ctx, 90);
}
