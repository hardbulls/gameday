import "./main.css";
import { GamesRepository } from "./repository/games-repository.ts";
import { Game } from "./model/game.ts";
import { convertFileToBase64 } from "./file-to-base64.ts";
import { imageToBlob } from "./image-to-blob.ts";
import { loadFonts } from "./fonts.ts";
import { PhotoRepository } from "./repository/photo-repository.ts";
import { PhotoSelect } from "./photo-select.ts";
import { i18n } from "./translations.ts";
import { GameSelect } from "./game-select.ts";
import { TextInput } from "./text-input.ts";
import { renderCanvas } from "./canvas/render.ts";
import { RenderType } from "./model/RenderType.ts";

function download(handleDownload: () => void): HTMLButtonElement {
  const downloadButton = document.createElement("button") as HTMLButtonElement;

  downloadButton.textContent = i18n("downloadImage");

  downloadButton.addEventListener("click", async (event) => {
    event.preventDefault();

    handleDownload();
  });

  return downloadButton;
}

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

type State = {
  type: RenderType;
  game?: Game;
  background?: string;
  title?: string;
};

(async () => {
  await loadFonts();

  const games = await GamesRepository.findWeeklyScheduledHomeGames();
  const photos = PhotoRepository.findPhotos();
  const canvas = document.createElement("canvas");
  const outputImage = document.createElement("img");

  outputImage.id = "output-image";

  const state: State = {
    type: RenderType.Overview,
    game: undefined,
    background: undefined,
    title: "Game Day",
  };

  async function render() {
    await renderCanvas(outputImage, canvas, {
      hiddenLeagues: ["llv", "bbl", "2-blw", "vsl"],
      title: state.title || "",
      background:
        state.background &&
        (await convertFileToBase64(await imageToBlob(state.background))),
      games:
        state.type === RenderType.Game && state.game ? [state.game] : games,
      type: state.type,
    });
  }

  const textInput = new TextInput(state.title || "", async (value) => {
    state.title = value;

    await render();
  });

  const uploadField = uploadBackground(async (file) => {
    state.background = await convertFileToBase64(file);

    await render();
  });

  const gameSelect = new GameSelect(games, async (game) => {
    if (game) {
      state.type = RenderType.Game;
      state.game = game;
    } else {
      state.type = RenderType.Overview;
      state.game = undefined;
    }

    await render();
  });

  const backgroundSelect = new PhotoSelect(photos, async (photoUrl) => {
    state.background = photoUrl;

    await render();
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
    gameSelect,
    backgroundSelect,
    textInput,
    uploadField,
  );

  await render();

  (document.querySelector("#display") as HTMLDivElement).append(outputImage);

  (document.querySelector("#download") as HTMLDivElement).append(
    downloadButton,
  );
})();
