import Modal from "./Modal.js";
import Form from "./Form.js";
import Select from "./Select.js";
import Input from "./Input.js";
import TextArea from "./TextArea.js";

class Visit {
  constructor() {
    this.visitModal = new Modal();
    this.visitForm = new Form();

    this.visitModal.title("Заполните карту пациента", "visitModal-title");

    this.visitReason = new Input();
    this.visitReason.baseAttr(
      "text",
      "reasonField",
      "",
      "Пример: Сильная боль",
      "required"
    );

    this.visitIntro = new TextArea();
    this.visitIntro.baseAttr(
      "introField",
      "",
      "Опишите проблему...",
      "required"
    );

    this.visitEmergency = new Select();
    this.visitEmergency.addOption("Обычная", "Обычная");
    this.visitEmergency.addOption("Приоритетная", "Приоритетная");
    this.visitEmergency.addOption("Неотложная", "Неотложная");

    this.visitFullName = new Input();
    this.visitFullName.baseAttr(
      "text",
      "fullNameField",
      "",
      "Пример: Иванов Иван Иванович",
      "required"
    );

    this.visitSubmit = new Input();
    this.visitSubmit.baseAttr("submit", "visitSubmit", "Создать карту");
  }
}

export default Visit;