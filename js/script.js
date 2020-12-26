class Modal {
    constructor() {
        this.modal = document.createElement('div');
        this.modalBody = document.createElement('div');
        this.modalContent = document.createElement('div');
        this.modalCloser = document.createElement('a');
    }

    insert(...elements) {
        return this.modalContent.append(...elements);
    }

    create() {
        this.modal.classList.add('modal', 'modal--open');
        this.modalBody.className = 'modal__body';
        this.modalContent.className = 'modal__content';
        this.modalCloser.className = 'modal__close';
        this.modalCloser.setAttribute('href', '#');
        this.modalCloser.textContent = String.fromCharCode(0x2716);
        this.modalCloser.addEventListener('click', (e) => {
            e.preventDefault();
            if(this.modal.classList.contains('modal--open')) {
                this.modal.classList.remove('modal--open');
                this.modal.remove();
            }
        })

        this.modalContent.append(this.modalCloser);
        this.modalBody.append(this.modalContent);
        this.modal.append(this.modalBody);
        document.body.append(this.modal);
        return this.modal;
    }


    close() {
        if(this.modal.classList.contains('modal--open')) {
            this.modal.classList.remove('modal--open');
            this.modal.remove();
        }
    }

    open() {
        if(!this.modal.classList.contains('modal--open')) {
            this.modal.classList.add('modal--open');
        }
    }

    remove() {
        this.modal.remove();
    }

    title(titleText = '', initClass = '') {
        const title = document.createElement('p');
        title.textContent = titleText;
        title.classList.add('modal-title', initClass);
        this.modalContent.prepend(title);
    }
}

class Form {
    constructor() {
        this.form = document.createElement('form');
    }

    insert(...elements) {
        this.form.append(...elements);
    }

    create() {
        this.form.classList.add('form');
        return this.form;
    }
}

class Input {
    constructor() {
        this.input = document.createElement('input');
    }

    create() {
        return this.input;
    }

    baseAttr(type = 'text', id = '', value = '', placeholder = '', required = '', name = '') {
        this.input.setAttribute('type', type);
        if(id) this.input.setAttribute('id', id);
        if(value) this.input.setAttribute('value', value);
        if(placeholder) this.input.setAttribute('placeholder', placeholder);
        if(required) this.input.setAttribute('required', required);
        if(name) this.input.setAttribute('name', name);
    }

    error() {
        const errorSpan = document.createElement("span");
        errorSpan.classList.add('errSpan');
        errorSpan.textContent = 'Неверно заполнено поле!';
        if(!this.input.value.trim()) {
            if(this.input.nextElementSibling.classList.contains('errSpan')) {
                this.input.classList.remove('errInput');
                this.input.nextElementSibling.remove();
            }
            this.input.classList.add('errInput');
            this.input.after(errorSpan);
        }
        this.input.addEventListener('blur', () => {
            if(this.input.value.trim()) {
                this.input.classList.remove('errInput');
                this.input.nextElementSibling.remove();
            }
        });
    }

    event(evt = '', fn) {
        this.input.addEventListener(evt, fn);
    }

    label(text = '', initClass = '') {
        const label = document.createElement('label');
        if(initClass) label.classList.add(initClass);
        label.setAttribute('for', this.input.id);
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

class TextArea {
    constructor() {
        this.textarea = document.createElement('textarea');
    }

    create() {
        return this.textarea;
    }

    baseAttr(id = '', value = '', placeholder = '', required = '') {
        if(id) this.textarea.setAttribute('id', id);
        if(value) this.textarea.setAttribute('value', value);
        if(placeholder) this.textarea.setAttribute('placeholder', placeholder);
        if(required) this.textarea.setAttribute('required', required);
    }

    label(text = '', initClass = '') {
        const label = document.createElement('label');
        if(initClass) label.classList.add(initClass);
        label.setAttribute('for', this.textarea.id);
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

class Select {
    constructor() {
        this.select = document.createElement('select');
    }

    create() {
        return this.select;
    }

    addOption(text = '', value = '') {
        const option = document.createElement('option');
        if(text) option.textContent = text;
        if(value) option.setAttribute('value', value);
        this.select.append(option);
        return option;
    }

    baseAttr(id = '', disabled = false) {
        if(id) this.select.setAttribute('id', id);
        if(disabled) this.select.setAttribute('disabled', disabled);
    }

    label(text = '') {
        const label = document.createElement('label');
        label.setAttribute('for', this.select.id);
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

class Visit {
    constructor() {
        this.visitModal = new Modal();
        this.visitForm = new Form();

        this.visitModal.title('Заполните карту пациента', 'visitModal-title');

        this.visitReason = new Input();
        this.visitReason.baseAttr('text', 'reasonField', '', 'Пример: Сильная боль', 'required');

        this.visitIntro = new TextArea();
        this.visitIntro.baseAttr('introField', '', 'Опишите проблему...', 'required');

        this.visitEmergency = new Select();
        this.visitEmergency.addOption('Обычная', 'Обычная');
        this.visitEmergency.addOption('Приоритетная', 'Приоритетная');
        this.visitEmergency.addOption('Неотложная', 'Неотложная');

        this.visitFullName = new Input();
        this.visitFullName.baseAttr('text', 'fullNameField', '', 'Пример: Иванов Иван Иванович', 'required');

        this.visitSubmit = new Input();
        this.visitSubmit.baseAttr('submit', 'visitSubmit', 'Создать карту');
    }
}

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
            this.visitSubmit.create(),
        );
        this.visitReason.label('Цель визита', 'dent-label');
        this.visitIntro.label('Краткое описание', 'dent-label');
        this.visitEmergency.label('Срочность', 'dent-label');
        this.visitFullName.label('ФИО пациента', 'dent-label');

        return this.visitModal;
    }

    event(evt = '', fn) {
        this.visitSubmit.event(evt, fn);
    }

    close() {
        this.visitModal.close()
    }

    setValues(newReason = 'Пусто', newIntro = 'Пусто', newEmergency = 'Пусто', newFullName = 'Пусто', newSubmit = 'Сохранить изменения') {
        this.visitReason.value = newReason;
        this.visitIntro.value = newIntro;
        this.visitEmergency.value = newEmergency;
        this.visitFullName.value = newFullName;
        this.visitSubmit.value = newSubmit;
    }

    get value() {
        return {
            'Врач': 'Стоматолог',
            'Цель': this.visitReason.value,
            'Краткое описание': this.visitIntro.value,
            'Срочность': this.visitEmergency.value,
            'ФИО': this.visitFullName.value,
        };
    }

    set title(newTitle) {
        return this.visitTitle.textContent = newTitle;
    }
}

class VisitTherapist extends Visit {
    constructor() {
        super();
        this.visitAge = new Input();
        this.visitAge.baseAttr('text', 'ageField', '', 'Пример: 18', 'required');
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
            this.visitSubmit.create(),
        );
        this.visitReason.label('Цель визита', 'ther-label');
        this.visitIntro.label('Краткое описание', 'ther-label');
        this.visitEmergency.label('Срочность', 'ther-label');
        this.visitFullName.label('ФИО пациента', 'ther-label');
        this.visitAge.label('Возраст пациента', 'ther-label')

        return this.visitModal;
    }

    error() {
        if(!this.visitReason.value.trim() || !this.visitFullName.value.trim() || !this.visitAge.value.trim()) {
            this.visitReason.error();
            this.visitFullName.error();
            this.visitAge.error();
            return;
        }
    }

    event(evt = '', fn) {
        this.visitSubmit.event(evt, fn);
    }

    close() {
        this.visitModal.close();
    }

    setValues(newReason = 'Пусто', newIntro = 'Пусто', newEmergency = 'Пусто', newFullName = 'Пусто', newAge = 'Пусто', newSubmit = 'Сохранить изменения') {
        this.visitReason.value = newReason;
        this.visitIntro.value = newIntro;
        this.visitEmergency.value = newEmergency;
        this.visitFullName.value = newFullName;
        this.visitAge.value = newAge;
        this.visitSubmit.value = newSubmit;
    }

    get value() {
        return {
            'Врач': 'Терапевт',
            'Цель': this.visitReason.value,
            'Краткое описание': this.visitIntro.value,
            'Срочность': this.visitEmergency.value,
            'ФИО': this.visitFullName.value,
            'Возраст': this.visitAge.value,
        };
    }
}

class VisitCardiologist extends Visit {
    constructor() {
        super();
        this.visitPressure = new Input();
        this.visitBMI = new Input();
        this.visitPrevDiseases = new Input();
        this.visitAge = new Input();

        this.visitPressure.baseAttr('text', 'pressureField', '', 'Пример: 120/80', 'required');
        this.visitBMI.baseAttr('text', 'BMIField', '', 'Пример: 8.5', 'required');
        this.visitPrevDiseases.baseAttr('text', 'prevDiseasesField', '', 'Пример: Инфаркт', 'required');
        this.visitAge.baseAttr('text', 'ageField', '', 'Пример: 18', 'required');
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
            this.visitSubmit.create(),
        );
        this.visitReason.label('Цель визита', 'cardio-label');
        this.visitIntro.label('Краткое описание', 'cardio-label');
        this.visitEmergency.label('Срочность', 'cardio-label');
        this.visitFullName.label('ФИО пациента', 'cardio-label');
        this.visitPressure.label('Обычное давление пациента', 'cardio-label');
        this.visitBMI.label('Индекс массы тела пациента', 'cardio-label');
        this.visitPrevDiseases.label('Перенесённые болезни сердца', 'cardio-label');
        this.visitAge.label('Возраст пациента', 'cardio-label');

        return this.visitModal;
    }

    event(evt = '', fn) {
        this.visitSubmit.event(evt, fn);
    }

    close() {
        this.visitModal.close();
    }

    setValues(newReason = 'Пусто', newIntro = 'Пусто', newEmergency = 'Пусто', newFullName = 'Пусто', newPressure = 'Пусто', newBMI = 'Пусто', newPrevDiseases = 'Пусто', newAge = 'Пусто', newSubmit = 'Сохранить изменения') {
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
            'Врач': 'Кардиолог',
            'Цель': this.visitReason.value,
            'Краткое описание': this.visitIntro.value,
            'Срочность': this.visitEmergency.value,
            'ФИО': this.visitFullName.value,
            'Обычное давление': this.visitPressure.value,
            'ИМТ': this.visitBMI.value,
            'Перенесенныё болезни ССС': this.visitPrevDiseases.value,
            'Возраст': this.visitAge.value,
        };
    }

    set title(newTitle) {
        return this.visitTitle.textContent = newTitle;
    }
}

//Переменные

const loginButton = document.getElementById('loginButton');
const createVisitButton = document.getElementById('createVisitButton');
const defaultText = document.querySelector('.visit__field__default-text');
const visitField = document.querySelector('.visit__field__inner');
const loginURL = 'https://ajax.test-danit.com/api/cards/login';
const generalUrl = 'https://ajax.test-danit.com/api/cards';

//Авторизация
loginButton.addEventListener('click', logInModal);

//Открытие модального окна авторизации
function logInModal(e) {
    e.preventDefault();
    const loginModal = new Modal();
    const loginForm = new Form();
    const loginEmail = new Input();
    const loginPassword = new Input();
    const loginSubmit = new Input();

    loginEmail.baseAttr('email', 'loginEmail', '', 'Введите email', 'required');
    loginPassword.baseAttr('password', 'loginPassword', '', 'Введите пароль', 'required');
    loginSubmit.baseAttr('submit', 'loginSubmit', 'Войти', '');

    loginModal.create();
    loginModal.insert(loginForm.create());
    loginForm.insert(loginEmail.create(), loginPassword.create(), loginSubmit.create());

    loginModal.title('АВТОРИЗАЦИЯ', 'login-title');
    loginEmail.label('EMAIL', 'email-label');
    loginPassword.label('ПАРОЛЬ', 'password-label');

    loginSubmit.event('click', (e) => {
        e.preventDefault();
        if(!loginEmail.value.trim() || !loginPassword.value.trim()) {
            loginEmail.error();
            loginPassword.error();
            return;
        }
        getAuthorizationData(loginEmail, loginPassword, loginModal);
    })
}

//Получение данных для авторизации
function getAuthorizationData(email, password, ...optional) {
    const data = {
        email: email.value,
        password: password.value,
    };
    if(data.email && data.password) {
        authorization(data, ...optional);
    }
}

//Авторизация
function authorization(data, ...optional) {
    sendRequest(loginURL, method = 'POST', data)
        .then(response => {
            if(response.status >= 200 && response.status <= 399) {
                return response.text()
            }
            else {
                throw new Error('Ошибка! Неверный email или пароль.')
            }
        })
        .then(data => {
            sessionStorage.setItem('token', data);
            optional[0].close();
            changeButton(loginButton, createVisitButton);
            createFilter();
        })
        .catch(error => console.log(error.message));
}

//Смена кнопок
function changeButton(show, hide) {
    if(hide.classList.contains('hide')) {
        hide.classList.remove('hide');
        show.classList.add('hide');
    }
}

//Создание карточки
createVisitButton.addEventListener('click', createVisitModal);

//Открытие модального окна выбора врача
function createVisitModal(e) {
    e.preventDefault();
    const createVisitModal = new Modal();
    const createVisitForm = new Form();
    const createVisitSelect = new Select();
    const createVisitSubmit = new Input();

    createVisitSelect.addOption('Терапевт', 'therapist');
    createVisitSelect.addOption('Стоматолог', 'dentist');
    createVisitSelect.addOption('Кардиолог', 'cardiologist');
    createVisitSelect.baseAttr('createVisitSelect');
    createVisitSubmit.baseAttr('submit', 'createVisitSubmit', 'Подтвердить выбор', '');

    createVisitModal.create();
    createVisitModal.insert(createVisitForm.create());
    createVisitForm.insert(createVisitSelect.create(), createVisitSubmit.create());
    createVisitModal.title('Выберите врача', 'createVisit-title');

    createVisitSubmit.event('click', (e) => {
        e.preventDefault();
        createVisitModal.close();
        completeCard(createVisitSelect.value)
    });
}

//Создание нового окна в зависимости от выбора врача
function completeCard(value) {
    if(value === 'therapist') {
        const therapistCard = new VisitTherapist();
        therapistCard.create();
        therapistCard.visitSubmit.event('click', (e) => {
            e.preventDefault();
            if(!therapistCard.visitReason.value.trim() || !therapistCard.visitFullName.value.trim() || !therapistCard.visitAge.value.trim()) {
                therapistCard.visitReason.error();
                therapistCard.visitFullName.error();
                therapistCard.visitAge.error();
                return;
            }
            getCardData(therapistCard.value);
            therapistCard.close();
        });
    }
    else if(value === 'dentist') {
        const dentistCard = new VisitDentist();
        dentistCard.create();
        dentistCard.visitSubmit.event('click', (e) => {
            e.preventDefault();
            if(!dentistCard.visitReason.value.trim() || !dentistCard.visitFullName.value.trim()) {
                dentistCard.visitReason.error();
                dentistCard.visitFullName.error();
                return;
            }
            getCardData(dentistCard.value);
            dentistCard.close();
        });
    }
    else if(value === 'cardiologist') {
        const cardiologistCard = new VisitCardiologist();
        cardiologistCard.create();
        cardiologistCard.visitSubmit.event('click', (e) => {
            e.preventDefault();
            if(!cardiologistCard.visitReason.value.trim() || !cardiologistCard.visitFullName.value.trim() || !cardiologistCard.visitPressure.value.trim() || !cardiologistCard.visitBMI.value.trim() || !cardiologistCard.visitPrevDiseases.value.trim() || !cardiologistCard.visitAge.value.trim()) {
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
    const card = document.createElement('div');
    const cardList = document.createElement('ul');
    const cardDeleteBtn = document.createElement('a');
    const showMoreLessButton = document.createElement('a');
    const editCardButton = document.createElement('a');

    showMoreLessButton.setAttribute('href', '#');
    showMoreLessButton.textContent = 'Показать больше';

    editCardButton.setAttribute('href', '#');
    editCardButton.textContent = 'Редактировать';
    editCardButton.classList.add('edit-card', 'hide');

    card.classList.add('card', 'card--before');
    card.id = id;
    cardList.textContent = `Карта пациента №${id}`;

    cardDeleteBtn.setAttribute('href', '#');
    cardDeleteBtn.className = "card-delete";
    cardDeleteBtn.textContent = String.fromCharCode(0x2716);

    for (let key in data) {
        const cardItem = document.createElement('li');
        cardItem.className = 'card-item';
        cardList.classList.add('card-list', 'card__list--before');

        if(key !== 'Врач') {
            cardItem.classList.add('hide');
            showMoreLessForItems(showMoreLessButton, cardItem);
        }
        cardItem.textContent = `${key}: ${data[key]}`;
        cardList.append(cardItem);
    }
    cardList.append(showMoreLessButton);
    card.append(cardDeleteBtn, cardList, editCardButton);
    if(defaultText) defaultText.classList.add('hide');
    visitField.append(card);

    showMoreLessForCard(showMoreLessButton, card, cardList, editCardButton);

    cardDeleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        deleteCard(id);
    });

    editCardButton.addEventListener('click', (e) => {
        e.preventDefault();
        editCard(id);
    });
}

//Удаление карты пациента
function deleteCard(id) {
    document.getElementById(id).remove();
    sessionStorage.removeItem(id);
    if(visitField.children.length === 1) {
        defaultText.classList.remove('hide');
    }
    sendRequest(generalUrl + `/${id}`, method = 'DELETE')
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.log(error.message));
}

//Редактирование карты
function editCard(id) {
    const a1 = JSON.parse(sessionStorage.getItem(id));
    if(a1['Врач'] === 'Терапевт') {
        const editT = new VisitTherapist();
        editT.create();
        const {
            'Врач': doctor,
            'Цель': reason,
            'Краткое описание' : intro,
            'Срочность': emer,
            'ФИО': fullname,
            'Возраст': age,
        } = a1;
        editT.setValues(reason, intro, emer, fullname, age);
        editT.event('click', (e) => {
            e.preventDefault();
            if(!editT.visitReason.value.trim() || !editT.visitFullName.value.trim() || !editT.visitAge.value.trim()) {
                editT.visitReason.error();
                editT.visitFullName.error();
                editT.visitAge.error();
                return;
            }
            editT.close();
            editData(editT.value, id);
        })
    }
    else if(a1['Врач'] === 'Стоматолог') {
        const editD = new VisitDentist();
        editD.create();
        const {
            'Врач': doctor,
            'Цель': reason,
            'Краткое описание' : intro,
            'Срочность': emer,
            'ФИО': fullname,
        } = a1;
        editD.setValues(reason, intro, emer, fullname);
        editD.event('click', (e) => {
            e.preventDefault();
            if(!editD.visitReason.value.trim() || !editD.visitFullName.value.trim()) {
                editD.visitReason.error();
                editD.visitFullName.error();
                return;
            }
            editD.close();
            editData(editD.value, id);
        })
    }
    else if(a1['Врач'] === 'Кардиолог') {
        const editC = new VisitCardiologist();
        editC.create();
        const {
            'Врач': doctor,
            'Цель': reason,
            'Краткое описание' : intro,
            'Срочность': emer,
            'ФИО': fullname,
            'Обычное давление': pressure,
            'ИМТ': BMI,
            'Перенесенныё болезни ССС': prevDiseases,
            'Возраст': age,
        } = a1;
        editC.setValues(reason, intro, emer, fullname, pressure, BMI, prevDiseases, age);
        editC.event('click', (e) => {
            e.preventDefault();
            if(!editC.visitReason.value.trim() || !editC.visitFullName.value.trim() || !editC.visitPressure.value.trim() || !editC.visitBMI.value.trim() || !editC.visitPrevDiseases.value.trim() || !editC.visitAge.value.trim()) {
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

        })
    }
}

//Отправка отредактированных данных на сервер
function editData(data, id) {
    sendRequest(generalUrl + `/${id}`, method = 'PUT', data)
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem(data.id, JSON.stringify(data.content));
            buildShowCard(data.content, data.id);
            const oldCard = document.getElementById(id);
            const newCard = visitField.lastElementChild;
            oldCard.replaceWith(newCard);
            oldCard.remove();
        })
        .catch(error => console.log(error.message));
}

//"Показать больше - меньше"
function showMoreLessForCard(e, card, cardList, editCardButton) {
    e.addEventListener('click', (e) => {
        e.preventDefault();
        e.target.classList.toggle('less');
        if(e.target.classList.contains('less')) {
            e.target.textContent = 'Скрыть';
        }
        else {
            e.target.textContent = 'Показать больше';
        }
        card.classList.toggle('card--before');
        cardList.classList.toggle('card__list--before');
        editCardButton.classList.toggle('hide');
    })
}

function showMoreLessForItems(e, cardItem) {
    e.addEventListener('click', (e) => {
        e.preventDefault();
        cardItem.classList.toggle('show');
    });
}

//Получение данных и отправка на сервер
function getCardData(data) {
    sendRequest(generalUrl, method = 'POST', data)
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem(data.id, JSON.stringify(data.content))
            buildShowCard(data.content, data.id);
        })
        .catch(error => console.log(error.message));
}

function createFilter() {
    const searchField = document.querySelector('.search__field');
    const searchInput = new Input();
    const prioritySelect = new Select();
    const openDoneSelect = new Select();
    const searchButton = new Input();

    searchField.append(searchInput.create(), prioritySelect.create(), openDoneSelect.create(), searchButton.create());

    searchInput.baseAttr('text', 'search-input', '', 'Поиск по названию');
    prioritySelect.baseAttr('priority');
    prioritySelect.addOption('Все', 'All');
    prioritySelect.addOption('Обычная', 'Обычная');
    prioritySelect.addOption('Приоритетная', 'Приоритетная');
    prioritySelect.addOption('Неотложная', 'Неотложная');
    prioritySelect.baseAttr('priority');
    openDoneSelect.addOption('Все', 'All');
    openDoneSelect.addOption('Open', 'Open');
    openDoneSelect.addOption('Done', 'Done');
    openDoneSelect.baseAttr('open-done');
    searchButton.baseAttr('submit', 'search-btn', 'Поиск');

    visitFilter();
}

function visitFilter() {
    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", ()=> {
        sendRequest(generalUrl, method = 'GET')
        .then(data =>data.json())
        .then(cards => {
            const prioritySelect = document.getElementById("priority").value;

            const searchInput = document.getElementById("search-input").value;

            const newCards = cards.filter(({content, id}) => {
                return (
                    (prioritySelect === content["Срочность"] || prioritySelect === 'All') &&
                    ((id.toString().includes(searchInput) || !searchInput) ||
                    (content["Краткое описание"].toLowerCase().includes(searchInput.toLowerCase() ) || !searchInput))
                )
        })
        document.querySelectorAll('.card').forEach(e => {
            e.remove();
        });
        if(visitField.children.length === 1) {
            defaultText.classList.remove('hide');
        }
        else {
            defaultText.classList.add('hide');
        }
        newCards.sort((a, b) => {
            return a.id - b.id;
        })
        newCards.forEach((item) => {
            buildShowCard(item.content, item.id);
        })
    })
        .catch(error => console.log(error.message));
    });
}

function sendRequest(url, method = 'GET', body) {
    return fetch(url, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    if(sessionStorage.getItem('token')) {
        changeButton(loginButton, createVisitButton);
        for (const key in sessionStorage) {
            if(!isNaN(Number(key))) {
                buildShowCard(JSON.parse(sessionStorage.getItem(key)), key);
            }
        }
        createFilter();
    }
});
