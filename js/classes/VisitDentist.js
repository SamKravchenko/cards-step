import Visit from "./Visit.js";

class VisitDentist extends Visit {
  constructor() {
    super();
  }

  create() {
    this.visitModal.create();
    this.visitModal.insert(this.visitForm.create());
    this.visitForm.insert(
      this.visitReason.create(),
      this.visitIntro.create(),
      this.visitEmergency.create(),
      this.visitFullName.create(),
      this.visitSubmit.create()
    );
    this.visitReason.label("Цель визита", "dent-label");
    this.visitIntro.label("Краткое описание", "dent-label");
    this.visitEmergency.label("Срочность", "dent-label");
    this.visitFullName.label("ФИО пациента", "dent-label");

    return this.visitModal;
  }

  event(evt = "", fn) {
    this.visitSubmit.event(evt, fn);
  }

  close() {
    this.visitModal.close();
  }

  setValues(
    newReason = "Пусто",
    newIntro = "Пусто",
    newEmergency = "Пусто",
    newFullName = "Пусто",
    newSubmit = "Сохранить изменения"
  ) {
    this.visitReason.value = newReason;
    this.visitIntro.value = newIntro;
    this.visitEmergency.value = newEmergency;
    this.visitFullName.value = newFullName;
    this.visitSubmit.value = newSubmit;
  }

  get value() {
    return {
      Врач: "Стоматолог",
      Цель: this.visitReason.value,
      "Краткое описание": this.visitIntro.value,
      Срочность: this.visitEmergency.value,
      ФИО: this.visitFullName.value,
    };
  }

  set title(newTitle) {
    return (this.visitTitle.textContent = newTitle);
  }
}

export default VisitDentist;