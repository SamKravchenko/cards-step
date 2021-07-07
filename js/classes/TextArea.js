class TextArea {
  constructor() {
    this.textarea = document.createElement("textarea");
  }

  create() {
    return this.textarea;
  }

  baseAttr(id = "", value = "", placeholder = "", required = "") {
    if (id) this.textarea.setAttribute("id", id);
    if (value) this.textarea.setAttribute("value", value);
    if (placeholder) this.textarea.setAttribute("placeholder", placeholder);
    if (required) this.textarea.setAttribute("required", required);
  }

  label(text = "", initClass = "") {
    const label = document.createElement("label");
    if (initClass) label.classList.add(initClass);
    label.setAttribute("for", this.textarea.id);
    label.textContent = text;
    this.textarea.parentElement.insertBefore(label, this.textarea);
  }

  get value() {
    return this.textarea.value;
  }

  set value(newValue) {
    this.textarea.value = newValue;
  }
}

export default TextArea;