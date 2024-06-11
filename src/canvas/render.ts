import { DrawOptions } from "../model/DrawOptions.ts";
import { drawBase } from "./base-canvas.ts";
import { drawOverviewGames } from "./overview-canvas.ts";
import { drawGame } from "./game-canvas.ts";
import { drawRibbon } from "./ribbon-canvas.ts";
import { convertToGermanDateFormat } from "../date.ts";

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

  await drawBase(ctx, options);

  if (options.type === "overview") {
    await drawOverviewGames(ctx, options);
    await drawRibbon(ctx, "Ballpark Hard");
  } else {
    await drawGame(ctx, { ...options, games: [options.games?.[0]] || [] });
    await drawRibbon(
      ctx,
      convertToGermanDateFormat(options.games?.[0]?.date || ""),
    );
  }

  outputImage.src = canvas.toDataURL("image/png");

  return outputImage;
}
