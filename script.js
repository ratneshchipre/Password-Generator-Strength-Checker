const passOutput = document.querySelector('#pass-output');
const copyBtn = document.querySelector('#copy-pass-btn');
const passStrengthMsg = document.querySelector('.pass-strength p');
const lengthNum = document.querySelector('#range-num');
const passRange = document.querySelector('#length-range');
const options = document.querySelectorAll('.option input');
const generateBtn = document.querySelector('#generate-btn');

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~",
}

generateBtn.addEventListener('click', () => {
    generatePassword();
});

function generatePassword() {
    let staticPassword = '';
    let randomPassword = '';
    let lengthPass = passRange.value;

    options.forEach(option => {
        if(option.checked) {
            staticPassword += characters[option.id];
        }
    });

    for (let i = 0; i < lengthPass; i++) {
        randomPassword += staticPassword[Math.floor(Math.random() * staticPassword.length)] 
    }

    passOutput.value = randomPassword;
}

passRange.addEventListener('input', () => {
    lengthNum.innerText = passRange.value;

    generatePassword();
    showPassStrength();
})

function showPassStrength() {
    if(passRange.value <= 9) {
        passStrengthMsg.innerText = "Weak Password";
        passStrengthMsg.style.color = "rgb(211, 0, 0)"
    } else if(passRange.value <= 18) {
        passStrengthMsg.innerText = "Moderate Password";
        passStrengthMsg.style.color = "rgb(228, 140, 0)"
    } else {
        passStrengthMsg.innerText = "Strong Password";
        passStrengthMsg.style.color = "green"
    }
}

copyBtn.addEventListener('click', () => {
    copyPassword();
})

function copyPassword() {
    navigator.clipboard.writeText(passOutput.value);

    copyBtn.classList.remove("fa-copy");
    copyBtn.classList.add("fa-check");

    setTimeout(() => {
        copyBtn.classList.remove("fa-check");
        copyBtn.classList.add("fa-copy");
    }, 1500)
}