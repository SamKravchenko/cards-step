class Modal {
  constructor() {
    this.modal = document.createElement("div");
    this.modalBody = document.createElement("div");
    this.modalContent = document.createElement("div");
    this.modalCloser = document.createElement("a");
  }

  insert(...elements) {
    return this.modalContent.append(...elements);
  }

  create() {
    this.modal.classList.add("modal", "modal--open");
    this.modalBody.className = "modal__body";
    this.modalContent.className = "modal__content";
    this.modalCloser.className = "modal__close";
    this.modalCloser.setAttribute("href", "#");
    this.modalCloser.textContent = String.fromCharCode(0x2716);
    this.modalCloser.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.modal.classList.contains("modal--open")) {
        this.modal.classList.remove("modal--open");
        this.modal.remove();
      }
    });

    this.modalContent.append(this.modalCloser);
    this.modalBody.append(this.modalContent);
    this.modal.append(this.modalBody);
    document.body.append(this.modal);
    return this.modal;
  }

  close() {
    if (this.modal.classList.contains("modal--open")) {
      this.modal.classList.remove("modal--open");
      this.modal.remove();
    }
  }

  open() {
    if (!this.modal.classList.contains("modal--open")) {
      this.modal.classList.add("modal--open");
    }
  }

  remove() {
    this.modal.remove();
  }

  title(titleText = "", initClass = "") {
    const title = document.createElement("p");
    title.textContent = titleText;
    title.classList.add("modal-title", initClass);
    this.modalContent.prepend(title);
  }
}

export default Modal;