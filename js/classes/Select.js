class Select {
  constructor() {
    this.select = document.createElement("select");
  }

  create() {
    return this.select;
  }

  addOption(text = "", value = "") {
    const option = document.createElement("option");
    if (text) option.textContent = text;
    if (value) option.setAttribute("value", value);
    this.select.append(option);
    return option;
  }

  baseAttr(id = "", disabled = false) {
    if (id) this.select.setAttribute("id", id);
    if (disabled) this.select.setAttribute("disabled", disabled);
  }

  label(text = "") {
    const label = document.createElement("label");
    label.setAttribute("for", this.select.id);
    label.textContent = text;
    this.select.parentElement.insertBefore(label, this.select);
  }

  get value() {
    return this.select.value;
  }

  set value(newValue) {
    this.select.value = newValue;
  }
}

export default Select;