function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function percent(n) {
    return n / 100;
}

const operations = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
    '%': percent
};

function operate(a, b, operator) {
    return operations[operator](a, b);
}

let operatorIsClicked = false;
let firstNumber = null;
let secondNumber = null;
let tempOperator = null;

const numbers = document.querySelector('.numbers');
const operators = document.querySelector('.operators');
const dot = document.querySelector('.dot');
const reverse = document.querySelector('.reverse');
const percentButton = document.querySelector('.percent');

const outputFiled = document.querySelector('.output-content');

const clear = document.querySelector('.cancel');

numbers.addEventListener('click', function (e) {
    if (e.target.classList.contains('number') && outputFiled.textContent.length <= 12) {
        if (outputFiled.textContent == '0') outputFiled.textContent = '';

        if (operatorIsClicked == true) {
            operatorIsClicked = false;
            firstNumber = Number(outputFiled.textContent);
            outputFiled.textContent = '';
        }

        outputFiled.textContent += e.target.textContent;
        if (outputFiled.textContent.length > 12)
            outputFiled.textContent = String(Number(outputFiled.textContent).toExponential(2));
    }
});


clear.addEventListener('click', () => {
    outputFiled.textContent = '0';
    firstNumber = secondNumber = tempOperator = null;
});

dot.addEventListener('click', () => {
    outputFiled.textContent.indexOf('.') != -1 || (outputFiled.textContent += '.')
});
reverse.addEventListener('click', function () {
    const condition = outputFiled.textContent.indexOf('-');
    if (Math.round(Number(outputFiled.textContent)) != 0 && condition == -1) {
        outputFiled.textContent = '-' + outputFiled.textContent;
    } else if (condition != -1) {
        outputFiled.textContent = outputFiled.textContent.replace('-', '');
    }
});
percentButton.addEventListener('click', function () {
    outputFiled.textContent = `${Number(outputFiled.textContent) / 100}`
    if (outputFiled.textContent.length > 12)
        outputFiled.textContent = String(Number(outputFiled.textContent).toExponential(2));
});

// Operators

operators.addEventListener('click', function (e) {
    operatorIsClicked = true;

    if (tempOperator != null) {
        secondNumber = Number(outputFiled.textContent);
        firstNumber = operate(firstNumber, secondNumber, tempOperator);
        outputFiled.textContent = `${firstNumber}`;

        if (outputFiled.textContent.length > 12)
            outputFiled.textContent = String(Number(outputFiled.textContent).toExponential(2));

        secondNumber = null;
        tempOperator = null;
    }

    if (tempOperator == null) tempOperator = e.target.textContent;
    if (tempOperator == '=') tempOperator = null;
})