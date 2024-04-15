import Font_NeueAaachen from "./assets/NeueAachenBlack.woff2";
import Font_AccidentalPresidency from "./assets/AccidentalPresidency.woff2";
import Font_Steelfish from "./assets/steelfish.woff2";

export async function loadFonts() {
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
