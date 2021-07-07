import Visit from "./Visit.js";
import Input from "./Input.js";

class VisitCardiologist extends Visit {
  constructor() {
    super();
    this.visitPressure = new Input();
    this.visitBMI = new Input();
    this.visitPrevDiseases = new Input();
    this.visitAge = new Input();

    this.visitPressure.baseAttr(
      "text",
      "pressureField",
      "",
      "Пример: 120/80",
      "required"
    );
    this.visitBMI.baseAttr("text", "BMIField", "", "Пример: 8.5", "required");
    this.visitPrevDiseases.baseAttr(
      "text",
      "prevDiseasesField",
      "",
      "Пример: Инфаркт",
      "required"
    );
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
      this.visitPressure.create(),
      this.visitBMI.create(),
      this.visitPrevDiseases.create(),
      this.visitAge.create(),
      this.visitSubmit.create()
    );
    this.visitReason.label("Цель визита", "cardio-label");
    this.visitIntro.label("Краткое описание", "cardio-label");
    this.visitEmergency.label("Срочность", "cardio-label");
    this.visitFullName.label("ФИО пациента", "cardio-label");
    this.visitPressure.label("Обычное давление пациента", "cardio-label");
    this.visitBMI.label("Индекс массы тела пациента", "cardio-label");
    this.visitPrevDiseases.label("Перенесённые болезни сердца", "cardio-label");
    this.visitAge.label("Возраст пациента", "cardio-label");

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
    newPressure = "Пусто",
    newBMI = "Пусто",
    newPrevDiseases = "Пусто",
    newAge = "Пусто",
    newSubmit = "Сохранить изменения"
  ) {
    this.visitReason.value = newReason;
    this.visitIntro.value = newIntro;
    this.visitEmergency.value = newEmergency;
    this.visitFullName.value = newFullName;
    this.visitPressure.value = newPressure;
    this.visitBMI.value = newBMI;
    this.visitPrevDiseases.value = newPrevDiseases;
    this.visitAge.value = newAge;
    this.visitSubmit.value = newSubmit;
  }

  get value() {
    return {
      Врач: "Кардиолог",
      Цель: this.visitReason.value,
      "Краткое описание": this.visitIntro.value,
      Срочность: this.visitEmergency.value,
      ФИО: this.visitFullName.value,
      "Обычное давление": this.visitPressure.value,
      ИМТ: this.visitBMI.value,
      "Перенесенныё болезни ССС": this.visitPrevDiseases.value,
      Возраст: this.visitAge.value,
    };
  }

  set title(newTitle) {
    return (this.visitTitle.textContent = newTitle);
  }
}

export default VisitCardiologist;