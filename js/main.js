var toggleBtns = document.getElementsByClassName('toggle-btn');

for (let i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener('click', function (e) {
        toggleMode();
        toggleBtns[i].disabled = true;
        toggleBtns[(i + 1) % 2].disabled = false;

        sleep(1000).then(() => {
            clearSignInForm();
            clearSignUpForm();
            hideAlerts();
        });

    })
}

function toggleMode() {
    document.body.classList.toggle('sign-in-mode');
    document.body.classList.toggle('sign-up-mode');
}

var users = [];
if (localStorage.getItem('users') != null)
    users = JSON.parse(localStorage.getItem('users'));

var signUpBtn = document.getElementById('sign-up-btn');
var loginBtn = document.getElementById('login-btn');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

signUpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let inputs = document.querySelectorAll('.sign-up input');

    if (signUpValidate(inputs)) {
        add_user(inputs);
        clearSignUpForm();
        sleep(400).then(() => { toggleMode(); });
    }

})

function signUpValidate(inputs) {
    hideAlerts();
    return (validateName(inputs[0].value) && validateEmail(inputs[1].value) && validatePassword(inputs[2].value));
}

function hideAlerts() {
    let alerts = document.getElementsByClassName('alert');
    for (let i = 0; i < alerts.length; i++) {
        if (!alerts[i].classList.contains('d-none'))
            alerts[i].classList.add('d-none');
    }
}

function validateEmail(email) {
    let alert = document.getElementsByClassName('email-alert')[0];
    let valid = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    if (valid && emailExists(email)) {
        alert.innerHTML = 'email already exists!';
        alert.classList.remove('d-none');
    }
    else if (!valid) {
        alert.innerHTML = 'email not valid!';
        alert.classList.remove('d-none');
    }
    else {
        if (!alert.classList.contains('d-none'))
            alert.classList.add('d-none');
        return true;
    }
    return false;
}

function validatePassword(password) {
    let alert = document.getElementsByClassName('password-alert')[0];
    if (password.length < 5) {
        alert.innerHTML = 'Password should be at least 5 characters!';
        alert.classList.remove('d-none');
    }
    else {
        if (!alert.classList.contains('d-none'))
            alert.classList.add('d-none');
        return true;
    }
    return false;
}

function emailExists(email) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email)
            return true;
    }
    return false;
}

function validateName(name) {
    let alert = document.getElementsByClassName('name-alert')[0];
    if (name.length == 0) {
        alert.classList.remove('d-none');
    }
    else {
        if (!alert.classList.contains('d-none'))
            alert.classList.add('d-none');
        return true;
    }
    return false;
}

loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let alert = document.getElementsByClassName('sign-in-alert')[0];
    if (!login()){
        if (alert.classList.contains('d-none'))
            alert.classList.remove('d-none');
    }
    else{
        if (!alert.classList.contains('d-none'))
            alert.classList.add('d-none');
    }
})

function add_user(inputs) {
    let user = {
        name: inputs[0].value,
        email: inputs[1].value,
        password: inputs[2].value
    };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function clearSignUpForm() {
    let inputs = document.querySelectorAll('.sign-up input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ''
    }
}

function clearSignInForm() {
    let inputs = document.querySelectorAll('.sign-in input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ''
    }
}

function login() {
    let inputs = document.querySelectorAll('.sign-in input');
    for (let i = 0; i < users.length; i++) {
        if (inputs[0].value === users[i].email && inputs[1].value === users[i].password) {
            console.log('success');
            localStorage.setItem('current_user', JSON.stringify(users[i]));
            window.location.href = 'welcome.html';
            return true;
        }
    }
    return false;
}

window.history.go(1);