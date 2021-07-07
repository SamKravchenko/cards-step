class Form {
  constructor() {
    this.form = document.createElement("form");
  }

  insert(...elements) {
    this.form.append(...elements);
  }

  create() {
    this.form.classList.add("form");
    return this.form;
  }
}

export default Form;