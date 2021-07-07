class Input {
  constructor() {
    this.input = document.createElement("input");
  }

  create() {
    return this.input;
  }

  baseAttr(
    type = "text",
    id = "",
    value = "",
    placeholder = "",
    required = "",
    name = ""
  ) {
    this.input.setAttribute("type", type);
    if (id) this.input.setAttribute("id", id);
    if (value) this.input.setAttribute("value", value);
    if (placeholder) this.input.setAttribute("placeholder", placeholder);
    if (required) this.input.setAttribute("required", required);
    if (name) this.input.setAttribute("name", name);
  }

  error() {
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("errSpan");
    errorSpan.textContent = "Неверно заполнено поле!";
    if (!this.input.value.trim()) {
      if (this.input.nextElementSibling.classList.contains("errSpan")) {
        this.input.classList.remove("errInput");
        this.input.nextElementSibling.remove();
      }
      this.input.classList.add("errInput");
      this.input.after(errorSpan);
    }
    this.input.addEventListener("blur", () => {
      if (this.input.value.trim()) {
        this.input.classList.remove("errInput");
        this.input.nextElementSibling.remove();
      }
    });
  }

  event(evt = "", fn) {
    this.input.addEventListener(evt, fn);
  }

  label(text = "", initClass = "") {
    const label = document.createElement("label");
    if (initClass) label.classList.add(initClass);
    label.setAttribute("for", this.input.id);
    label.textContent = text;
    this.input.parentElement.insertBefore(label, this.input);
  }

  get value() {
    return this.input.value;
  }

  set value(newValue) {
    this.input.value = newValue;
  }
}

export default Input;