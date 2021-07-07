// Modal Class
import Modal from "./classes/Modal.js";
// Form Class
import Form from "./classes/Form.js";
// Input Class
import Input from "./classes/Input.js";
// Select Class
import Select from "./classes/Select.js";
// VisitDentist Class
import VisitDentist from "./classes/VisitDentist.js";
// VisitTherapist Class
import VisitTherapist from "./classes/VisitTherapist.js";
// VisitCardiologist Class
import VisitCardiologist from "./classes/VisitCardiologist.js";

//Переменные
import { loginButton } from "./variables.js";
import { createVisitButton } from "./variables.js";
import { defaultText } from "./variables.js";
import { visitField } from "./variables.js";
import { loginURL } from "./variables.js";
import { generalUrl } from "./variables.js";

//Авторизация
loginButton.addEventListener("click", logInModal);

//Открытие модального окна авторизации
function logInModal(e) {
  e.preventDefault();
  const loginModal = new Modal();
  const loginForm = new Form();
  const loginEmail = new Input();
  const loginPassword = new Input();
  const loginSubmit = new Input();

  loginEmail.baseAttr("email", "loginEmail", "", "Введите email", "required");
  loginPassword.baseAttr(
    "password",
    "loginPassword",
    "",
    "Введите пароль",
    "required"
  );
  loginSubmit.baseAttr("submit", "loginSubmit", "Войти", "");

  loginModal.create();
  loginModal.insert(loginForm.create());
  loginForm.insert(
    loginEmail.create(),
    loginPassword.create(),
    loginSubmit.create()
  );

  loginModal.title("АВТОРИЗАЦИЯ", "login-title");
  loginEmail.label("EMAIL", "email-label");
  loginPassword.label("ПАРОЛЬ", "password-label");

  loginSubmit.event("click", (e) => {
    e.preventDefault();
    if (!loginEmail.value.trim() || !loginPassword.value.trim()) {
      loginEmail.error();
      loginPassword.error();
      return;
    }
    getAuthorizationData(loginEmail, loginPassword, loginModal);
  });
}

//Получение данных для авторизации
function getAuthorizationData(email, password, ...optional) {
  const data = {
    email: email.value,
    password: password.value,
  };
  if (data.email && data.password) {
    authorization(data, ...optional);
  }
}

//Авторизация
function authorization(data, ...optional) {
  sendRequest(loginURL, "POST", data)
    .then((response) => {
      if (response.status >= 200 && response.status <= 399) {
        return response.text();
      } else {
        throw new Error("Ошибка! Неверный email или пароль.");
      }
    })
    .then((data) => {
      sessionStorage.setItem("token", data);
      optional[0].close();
      changeButton(loginButton, createVisitButton);
      createFilter();
    })
    .catch((error) => console.log(error.message));
}

//Смена кнопок
function changeButton(show, hide) {
  if (hide.classList.contains("hide")) {
    hide.classList.remove("hide");
    show.classList.add("hide");
  }
}

//Создание карточки
createVisitButton.addEventListener("click", createVisitModal);

//Открытие модального окна выбора врача
function createVisitModal(e) {
  e.preventDefault();
  const createVisitModal = new Modal();
  const createVisitForm = new Form();
  const createVisitSelect = new Select();
  const createVisitSubmit = new Input();

  createVisitSelect.addOption("Терапевт", "therapist");
  createVisitSelect.addOption("Стоматолог", "dentist");
  createVisitSelect.addOption("Кардиолог", "cardiologist");
  createVisitSelect.baseAttr("createVisitSelect");
  createVisitSubmit.baseAttr(
    "submit",
    "createVisitSubmit",
    "Подтвердить выбор",
    ""
  );

  createVisitModal.create();
  createVisitModal.insert(createVisitForm.create());
  createVisitForm.insert(
    createVisitSelect.create(),
    createVisitSubmit.create()
  );
  createVisitModal.title("Выберите врача", "createVisit-title");

  createVisitSubmit.event("click", (e) => {
    e.preventDefault();
    createVisitModal.close();
    completeCard(createVisitSelect.value);
  });
}

//Создание нового окна в зависимости от выбора врача
function completeCard(value) {
  if (value === "therapist") {
    const therapistCard = new VisitTherapist();
    therapistCard.create();
    therapistCard.visitSubmit.event("click", (e) => {
      e.preventDefault();
      if (
        !therapistCard.visitReason.value.trim() ||
        !therapistCard.visitFullName.value.trim() ||
        !therapistCard.visitAge.value.trim()
      ) {
        therapistCard.visitReason.error();
        therapistCard.visitFullName.error();
        therapistCard.visitAge.error();
        return;
      }
      getCardData(therapistCard.value);
      therapistCard.close();
    });
  } else if (value === "dentist") {
    const dentistCard = new VisitDentist();
    dentistCard.create();
    dentistCard.visitSubmit.event("click", (e) => {
      e.preventDefault();
      if (
        !dentistCard.visitReason.value.trim() ||
        !dentistCard.visitFullName.value.trim()
      ) {
        dentistCard.visitReason.error();
        dentistCard.visitFullName.error();
        return;
      }
      getCardData(dentistCard.value);
      dentistCard.close();
    });
  } else if (value === "cardiologist") {
    const cardiologistCard = new VisitCardiologist();
    cardiologistCard.create();
    cardiologistCard.visitSubmit.event("click", (e) => {
      e.preventDefault();
      if (
        !cardiologistCard.visitReason.value.trim() ||
        !cardiologistCard.visitFullName.value.trim() ||
        !cardiologistCard.visitPressure.value.trim() ||
        !cardiologistCard.visitBMI.value.trim() ||
        !cardiologistCard.visitPrevDiseases.value.trim() ||
        !cardiologistCard.visitAge.value.trim()
      ) {
        cardiologistCard.visitReason.error();
        cardiologistCard.visitFullName.error();
        cardiologistCard.visitPressure.error();
        cardiologistCard.visitBMI.error();
        cardiologistCard.visitPrevDiseases.error();
        cardiologistCard.visitAge.error();
        return;
      }
      getCardData(cardiologistCard.value);
      cardiologistCard.close();
    });
  }
}

// Создание и вывод карты пациента
function buildShowCard(data, id) {
  const card = document.createElement("div");
  const cardList = document.createElement("ul");
  const cardDeleteBtn = document.createElement("a");
  const showMoreLessButton = document.createElement("a");
  const editCardButton = document.createElement("a");

  showMoreLessButton.setAttribute("href", "#");
  showMoreLessButton.textContent = "Показать больше";

  editCardButton.setAttribute("href", "#");
  editCardButton.textContent = "Редактировать";
  editCardButton.classList.add("edit-card", "hide");

  card.classList.add("card", "card--before");
  card.id = id;
  cardList.textContent = `Карта пациента №${id}`;

  cardDeleteBtn.setAttribute("href", "#");
  cardDeleteBtn.className = "card-delete";
  cardDeleteBtn.textContent = String.fromCharCode(0x2716);

  for (let key in data) {
    const cardItem = document.createElement("li");
    cardItem.className = "card-item";
    cardList.classList.add("card-list", "card__list--before");

    if (key !== "Врач") {
      cardItem.classList.add("hide");
      showMoreLessForItems(showMoreLessButton, cardItem);
    }
    cardItem.textContent = `${key}: ${data[key]}`;
    cardList.append(cardItem);
  }
  cardList.append(showMoreLessButton);
  card.append(cardDeleteBtn, cardList, editCardButton);
  if (defaultText) defaultText.classList.add("hide");
  visitField.append(card);

  showMoreLessForCard(showMoreLessButton, card, cardList, editCardButton);

  cardDeleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteCard(id);
  });

  editCardButton.addEventListener("click", (e) => {
    e.preventDefault();
    editCard(id);
  });
}

//Удаление карты пациента
function deleteCard(id) {
  document.getElementById(id).remove();
  sessionStorage.removeItem(id);
  if (visitField.children.length === 1) {
    defaultText.classList.remove("hide");
  }
  sendRequest(generalUrl + `/${id}`, "DELETE")
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message));
}

//Редактирование карты
function editCard(id) {
  const a1 = JSON.parse(sessionStorage.getItem(id));
  if (a1["Врач"] === "Терапевт") {
    const editT = new VisitTherapist();
    editT.create();
    const {
      Врач: doctor,
      Цель: reason,
      "Краткое описание": intro,
      Срочность: emer,
      ФИО: fullname,
      Возраст: age,
    } = a1;
    editT.setValues(reason, intro, emer, fullname, age);
    editT.event("click", (e) => {
      e.preventDefault();
      if (
        !editT.visitReason.value.trim() ||
        !editT.visitFullName.value.trim() ||
        !editT.visitAge.value.trim()
      ) {
        editT.visitReason.error();
        editT.visitFullName.error();
        editT.visitAge.error();
        return;
      }
      editT.close();
      editData(editT.value, id);
    });
  } else if (a1["Врач"] === "Стоматолог") {
    const editD = new VisitDentist();
    editD.create();
    const {
      Врач: doctor,
      Цель: reason,
      "Краткое описание": intro,
      Срочность: emer,
      ФИО: fullname,
    } = a1;
    editD.setValues(reason, intro, emer, fullname);
    editD.event("click", (e) => {
      e.preventDefault();
      if (
        !editD.visitReason.value.trim() ||
        !editD.visitFullName.value.trim()
      ) {
        editD.visitReason.error();
        editD.visitFullName.error();
        return;
      }
      editD.close();
      editData(editD.value, id);
    });
  } else if (a1["Врач"] === "Кардиолог") {
    const editC = new VisitCardiologist();
    editC.create();
    const {
      Врач: doctor,
      Цель: reason,
      "Краткое описание": intro,
      Срочность: emer,
      ФИО: fullname,
      "Обычное давление": pressure,
      ИМТ: BMI,
      "Перенесенныё болезни ССС": prevDiseases,
      Возраст: age,
    } = a1;
    editC.setValues(
      reason,
      intro,
      emer,
      fullname,
      pressure,
      BMI,
      prevDiseases,
      age
    );
    editC.event("click", (e) => {
      e.preventDefault();
      if (
        !editC.visitReason.value.trim() ||
        !editC.visitFullName.value.trim() ||
        !editC.visitPressure.value.trim() ||
        !editC.visitBMI.value.trim() ||
        !editC.visitPrevDiseases.value.trim() ||
        !editC.visitAge.value.trim()
      ) {
        editC.visitReason.error();
        editC.visitFullName.error();
        editC.visitPressure.error();
        editC.visitBMI.error();
        editC.visitPrevDiseases.error();
        editC.visitAge.error();
        return;
      }
      editData(editC.value, id);
      editC.close();
    });
  }
}

//Отправка отредактированных данных на сервер
function editData(data, id) {
  sendRequest(generalUrl + `/${id}`, "PUT", data)
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem(data.id, JSON.stringify(data.content));
      buildShowCard(data.content, data.id);
      const oldCard = document.getElementById(id);
      const newCard = visitField.lastElementChild;
      oldCard.replaceWith(newCard);
      oldCard.remove();
    })
    .catch((error) => console.log(error.message));
}

//"Показать больше - меньше"
function showMoreLessForCard(e, card, cardList, editCardButton) {
  e.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.classList.toggle("less");
    if (e.target.classList.contains("less")) {
      e.target.textContent = "Скрыть";
    } else {
      e.target.textContent = "Показать больше";
    }
    card.classList.toggle("card--before");
    cardList.classList.toggle("card__list--before");
    editCardButton.classList.toggle("hide");
  });
}

function showMoreLessForItems(e, cardItem) {
  e.addEventListener("click", (e) => {
    e.preventDefault();
    cardItem.classList.toggle("show");
  });
}

//Получение данных и отправка на сервер
function getCardData(data) {
  sendRequest(generalUrl, "POST", data)
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem(data.id, JSON.stringify(data.content));
      buildShowCard(data.content, data.id);
    })
    .catch((error) => console.log(error.message));
}

function createFilter() {
  const searchField = document.querySelector(".search__field");
  const searchInput = new Input();
  const prioritySelect = new Select();
  const openDoneSelect = new Select();
  const searchButton = new Input();

  searchField.append(
    searchInput.create(),
    prioritySelect.create(),
    openDoneSelect.create(),
    searchButton.create()
  );

  searchInput.baseAttr("text", "search-input", "", "Поиск по названию");
  prioritySelect.baseAttr("priority");
  prioritySelect.addOption("Все", "All");
  prioritySelect.addOption("Обычная", "Обычная");
  prioritySelect.addOption("Приоритетная", "Приоритетная");
  prioritySelect.addOption("Неотложная", "Неотложная");
  prioritySelect.baseAttr("priority");
  openDoneSelect.addOption("Все", "All");
  openDoneSelect.addOption("Open", "Open");
  openDoneSelect.addOption("Done", "Done");
  openDoneSelect.baseAttr("open-done");
  searchButton.baseAttr("submit", "search-btn", "Поиск");

  visitFilter();
}

function visitFilter() {
  const searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("click", () => {
    sendRequest(generalUrl, "GET")
      .then((data) => data.json())
      .then((cards) => {
        const prioritySelect = document.getElementById("priority").value;

        const searchInput = document.getElementById("search-input").value;

        const newCards = cards.filter(({ content, id }) => {
          return (
            (prioritySelect === content["Срочность"] ||
              prioritySelect === "All") &&
            (id.toString().includes(searchInput) ||
              !searchInput ||
              content["Краткое описание"]
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              !searchInput)
          );
        });
        document.querySelectorAll(".card").forEach((e) => {
          e.remove();
        });
        if (visitField.children.length === 1) {
          defaultText.classList.remove("hide");
        } else {
          defaultText.classList.add("hide");
        }
        newCards.sort((a, b) => {
          return a.id - b.id;
        });
        newCards.forEach((item) => {
          buildShowCard(item.content, item.id);
        });
      })
      .catch((error) => console.log(error.message));
  });
}

function sendRequest(url, method = "GET", body) {
  return fetch(url, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(body),
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("token")) {
    changeButton(loginButton, createVisitButton);
    for (const key in sessionStorage) {
      if (!isNaN(Number(key))) {
        buildShowCard(JSON.parse(sessionStorage.getItem(key)), key);
      }
    }
    createFilter();
  }
});
