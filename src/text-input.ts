import { debounce } from "./debounce.ts";

export class TextInput extends HTMLElement {
  constructor(
    value: string,
    handleChange: (value: string) => void,
    debounceTime: number = 300,
  ) {
    super();

    const input = document.createElement("input");

    input.type = "text";
    input.value = value;
    input.placeholder = "Text";

    const debouncedHandleChange = debounce((value: string) => {
      handleChange(value);
    }, debounceTime);

    input.addEventListener("input", () => {
      debouncedHandleChange(input.value);
    });

    this.appendChild(input);
  }
}

window.customElements.define("text-input", TextInput);
