import Visit from "./Visit.js";
import Input from "./Input.js";

class VisitTherapist extends Visit {
  constructor() {
    super();
    this.visitAge = new Input();
    this.visitAge.baseAttr("text", "ageField", "", "Пример: 18", "required");
  }

  create() {
    this.visitModal.create();
    this.visitModal.insert(this.visitForm.create());
    this.visitForm.insert(
      this.visitReason.create(),
      this.visitIntro.create(),
      this.visitEmergency.create(),
      this.visitFullName.create(),
      this.visitAge.create(),
      this.visitSubmit.create()
    );
    this.visitReason.label("Цель визита", "ther-label");
    this.visitIntro.label("Краткое описание", "ther-label");
    this.visitEmergency.label("Срочность", "ther-label");
    this.visitFullName.label("ФИО пациента", "ther-label");
    this.visitAge.label("Возраст пациента", "ther-label");

    return this.visitModal;
  }

  error() {
    if (
      !this.visitReason.value.trim() ||
      !this.visitFullName.value.trim() ||
      !this.visitAge.value.trim()
    ) {
      this.visitReason.error();
      this.visitFullName.error();
      this.visitAge.error();
      return;
    }
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
    newAge = "Пусто",
    newSubmit = "Сохранить изменения"
  ) {
    this.visitReason.value = newReason;
    this.visitIntro.value = newIntro;
    this.visitEmergency.value = newEmergency;
    this.visitFullName.value = newFullName;
    this.visitAge.value = newAge;
    this.visitSubmit.value = newSubmit;
  }

  get value() {
    return {
      Врач: "Терапевт",
      Цель: this.visitReason.value,
      "Краткое описание": this.visitIntro.value,
      Срочность: this.visitEmergency.value,
      ФИО: this.visitFullName.value,
      Возраст: this.visitAge.value,
    };
  }
}

export default VisitTherapist;