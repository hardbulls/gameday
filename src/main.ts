import "./main.css";
import BullPng from "./assets/bull.png";
import Font_NeueAaachen from "./assets/NeueAachenBlack.woff2";
import Font_AccidentalPresidency from "./assets/AccidentalPresidency.woff2";
import Font_Steelfish from "./assets/steelfish.woff2";
import { GamesRepository } from "./games-repository.ts";
import { Game } from "./model/game.ts";
import { convertFileToBase64 } from "./file-to-base64.ts";
import { drawRoundedLeftSquare, drawRoundedRightSquare } from "./draw.ts";
import { imageToBlob } from "./image-to-blob.ts";

const BULLS_COLOR = "#e20613";

async function loadFonts() {
  for (const font of [
    { name: "Neue Aachen", data: Font_NeueAaachen },
    {
      name: "Accidental Presidency",
      data: Font_AccidentalPresidency,
    },
    {
      name: "Steelfish",
      data: Font_Steelfish,
    },
  ]) {
    const fontFace = new FontFace(
      font.name,
      `url("${font.data}") format("woff2")`,
    );

    await fontFace.load();

    document.fonts.add(fontFace);
  }
}

function getImageUrl(name: string) {
  return new URL(`./assets/backgrounds/${name}`, import.meta.url).href;
}

async function controls(
  handleSelect: (url: string) => void,
): Promise<HTMLSelectElement> {
  const selectBackground = document.createElement("select");

  const images = [
    {
      name: "Bulls Outfielder",
      url: "bulls_1.png",
    },
    {
      name: "Bulls Battery",
      url: "bulls_2.png",
    },
    {
      name: "Bulls Pitcher",
      url: "bulls_4.png",
    },
    {
      name: "Bulls Win",
      url: "bulls_3.png",
    },
    {
      name: "Bandidos Team",
      url: "bandidos_1.png",
    },
    {
      name: "Bandidas Youth Team",
      url: "bandidas_1.png",
    },
    {
      name: "Barons Team",
      url: "barons_1.png",
    },
    {
      name: "Bullets Team",
      url: "bullets_1.png",
    },
    {
      name: "U10 Win",
      url: "u10_1.png",
    },
    {
      name: "U12 Huddle",
      url: "u12_1.png",
    },
    {
      name: "U14 Batter",
      url: "u14_1.png",
    },
    {
      name: "U16 Team",
      url: "u16_1.png",
    },
    {
      name: "Glove",
      url: "glove_1.png",
    },
  ];

  selectBackground.add(new Option("-- Select Background --", ""));

  for (const { name, url } of images) {
    selectBackground.add(new Option(name, url));
  }

  selectBackground.addEventListener("change", (event) => {
    const select = event.target as HTMLSelectElement;

    handleSelect(select.value ? getImageUrl(select.value) : "");
  });

  return selectBackground;
}

function download(handleDownload: () => void): HTMLButtonElement {
  const downloadButton = document.createElement("button") as HTMLButtonElement;

  downloadButton.textContent = "Download Image";

  downloadButton.addEventListener("click", (event) => {
    event.preventDefault();

    handleDownload();
  });

  return downloadButton;
}

async function drawImage(
  ctx: CanvasRenderingContext2D,
  src: string,
  dx: number,
  dy: number,
  width: number,
  height: number,
): Promise<void> {
  const image = new Image();

  image.src = src;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      // Specify the target width and height
      const targetWidth = width; // Change this to your desired width
      const targetHeight = height; // Change this to your desired height

      // Calculate the scaling factors to cover the specified width and height
      const scaleX = targetWidth / image.width;
      const scaleY = targetHeight / image.height;

      // Choose the larger scaling factor to cover both width and height
      const scale = Math.max(scaleX, scaleY);

      // Calculate the destination width and height based on the scale
      const dWidth = image.width * scale;
      const dHeight = image.height * scale;

      // Draw the image with the calculated parameters
      ctx.drawImage(image, dx, dy, dWidth, dHeight);

      resolve();
    };

    image.onerror = () => {
      reject();
    };
  });
}

async function renderCanvas(
  outputImage: HTMLImageElement,
  canvas: HTMLCanvasElement,
  options: DrawOptions,
): Promise<HTMLImageElement> {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = 900;
  canvas.height = 1600;

  ctx.reset();
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

  const labelDiv = document.createElement("div");

  labelDiv.classList.add("file-input-label");

  const label = document.createElement("label");
  label.innerText = "Upload Background";

  labelDiv.append(label);

  const button = document.createElement("button");
  button.innerText = "Choose File";

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

  container.appendChild(labelDiv);
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

  const backgroundSelect = await controls(async (background) => {
    await renderCanvas(outputImage, canvas, {
      background: await convertFileToBase64(await imageToBlob(background)),
      games,
    });
  });

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
