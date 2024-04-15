import { Photo } from "./photo-repository.ts";
import { i18n } from "./translations.ts";

function getImageUrl(name: string) {
  return new URL(`./assets/backgrounds/${name}`, import.meta.url).href;
}

export class PhotoSelect extends HTMLElement {
  constructor(photos: Photo[], handleSelect: (url: string) => void) {
    super();

    const select = document.createElement("select");

    select.add(new Option(`-- ${i18n("selectPhoto")} --`, ""));

    for (const { name, url } of photos) {
      select.add(new Option(name, url));
    }

    select.addEventListener("change", () => {
      handleSelect(select.value ? getImageUrl(select.value) : "");
    });

    return select;
  }
}

window.customElements.define("photo-select", PhotoSelect);
