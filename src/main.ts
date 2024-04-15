import "./main.css";
import BullPng from "./assets/bull.png";
import { GamesRepository } from "./games-repository.ts";
import { Game } from "./model/game.ts";
import { convertFileToBase64 } from "./file-to-base64.ts";
import {
  drawImage,
  drawRoundedLeftSquare,
  drawRoundedRightSquare,
} from "./draw.ts";
import { imageToBlob } from "./image-to-blob.ts";
import { loadFonts } from "./fonts.ts";
import { PhotoRepository } from "./photo-repository.ts";
import { PhotoSelect } from "./photo-select.ts";
import { BULLS_COLOR } from "./config.ts";
import { i18n } from "./translations.ts";

function download(handleDownload: () => void): HTMLButtonElement {
  const downloadButton = document.createElement("button") as HTMLButtonElement;

  downloadButton.textContent = i18n("downloadImage");

  downloadButton.addEventListener("click", async (event) => {
    event.preventDefault();

    handleDownload();
  });

  return downloadButton;
}

async function renderCanvas(
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
      105,
      70,
      20,
      3,
      "#ffffff",
    );

    ctx.fillStyle = "#ffffff";

    drawRoundedRightSquare(
      ctx,
      offsetX + 105,
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
      96 + offsetX,
      gamesOffset + gameFontSize + offsetY,
    );

    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";

    ctx.fillText(
      `${game.times[0]}`,
      114 + offsetX,
      gamesOffset + gameFontSize + offsetY,
    );

    if (game.times.length > 1) {
      ctx.fillText(
        `|`,
        114 + offsetX + 82,
        gamesOffset + gameFontSize + offsetY,
      );

      ctx.fillText(
        `${game.times[1]}`,
        114 + offsetX + 100,
        gamesOffset + gameFontSize + offsetY,
      );
    }

    ctx.textAlign = "right";

    const teamsDisplay = `${game.home} vs. ${game.away}${
      game.league ? ` (${game.league.toUpperCase()})` : ""
    }`;
    ctx.fillText(teamsDisplay, 770, gamesOffset + gameFontSize + offsetY);
  }

  outputImage.src = canvas.toDataURL("image/png");

  return outputImage;
}

function rotateCanvas(ctx: CanvasRenderingContext2D, angle: number) {
  ctx.rotate((angle * Math.PI) / 180);
}

type DrawOptions = {
  background?: string;
  games: Game[];
};

function uploadBackground(
  handleUpload: (file: File | Blob) => void,
): HTMLDivElement {
  const container = document.createElement("div") as HTMLDivElement;

  container.classList.add("file-input");

  const button = document.createElement("button");
  button.innerText = i18n("uploadPhoto");

  const uploadField = document.createElement("input") as HTMLInputElement;
  uploadField.style.display = "none";
  uploadField.hidden = true;
  uploadField.type = "file";

  const triggerClick = () => {
    uploadField.click();
  };

  button.addEventListener("click", triggerClick);

  uploadField.addEventListener("change", () => {
    const file = uploadField.files?.[0];
    if (file) {
      handleUpload(file);
    }
  });

  container.appendChild(button);
  container.appendChild(uploadField);

  return container;
}

(async () => {
  await loadFonts();

  const games = await GamesRepository.findWeeklyScheduledHomeGames();
  const canvas = document.createElement("canvas");
  const outputImage = document.createElement("img");

  outputImage.id = "output-image";

  const uploadField = uploadBackground(async (file) => {
    await renderCanvas(outputImage, canvas, {
      background: await convertFileToBase64(file),
      games,
    });
  });

  const backgroundSelect = new PhotoSelect(
    PhotoRepository.findPhotos(),
    async (photoUrl) => {
      await renderCanvas(outputImage, canvas, {
        background: await convertFileToBase64(await imageToBlob(photoUrl)),
        games,
      });
    },
  );

  const downloadButton = download(() => {
    const downloadLink = document.createElement("a");

    downloadLink.style.display = "none";
    downloadLink.href = outputImage.src;
    downloadLink.download = "ballpark-hard.png";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });

  (document.querySelector("#controls") as HTMLDivElement).append(
    backgroundSelect,
    uploadField,
  );

  await renderCanvas(outputImage, canvas, { games });

  (document.querySelector("#display") as HTMLDivElement).append(outputImage);

  (document.querySelector("#download") as HTMLDivElement).append(
    downloadButton,
  );
})();
