import Font_NeueAaachen from "./assets/NeueAachenBlack.woff2";
import Font_DINCondensed from "./assets/DINCondensed.woff2";
import Font_DINCondensedBold from "./assets/DINCondensedBold.woff2";

export async function loadFonts() {
  for (const font of [
    { name: "Neue Aachen", data: Font_NeueAaachen },
    {
      name: "DIN Condensed",
      data: Font_DINCondensed,
    },
    {
      name: "DIN Condensed Bold",
      data: Font_DINCondensedBold,
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
