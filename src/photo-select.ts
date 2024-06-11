import { Photo } from "./repository/photo-repository.ts";
import { i18n } from "./translations.ts";

function getImageUrl(name: string) {
  return new URL(`./assets/backgrounds/${name}`, import.meta.url).href;
}

export class PhotoSelect extends HTMLElement {
  constructor(photos: Photo[], handleSelect: (url: string) => void) {
    super();

    const select = document.createElement("select");

    const placeholder = new Option(`-- ${i18n("selectPhoto")} --`, "");

    placeholder.disabled = true;
    placeholder.selected = true;

    select.add(placeholder);

    for (const { name, url } of photos) {
      select.add(new Option(name, url));
    }

    select.addEventListener("change", () => {
      handleSelect(select.value ? getImageUrl(select.value) : "");
    });

    this.appendChild(select);
  }
}

window.customElements.define("photo-select", PhotoSelect);
