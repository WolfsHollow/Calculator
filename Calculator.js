//Initialize variables and set up DOM
const pageContainer = document.querySelector('#page');
const calculatorContainer = document.querySelector('#calculatorContainer');
const displayContainer = document.querySelector('#display');
const previousDiv = document.querySelector('#previous');
const inputDiv = document.querySelector('#input');
const buttonContainer = document.querySelector('#buttonContainer');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const exponentButton = document.querySelector('#exponent');
const mulitplyButton = document.querySelector('#multiply');
const divideButton = document.querySelector('#divide');
const addButton = document.querySelector('#add');
const subtractButton = document.querySelector('#subtract');
const equalsButton = document.querySelector('#equals');
const decimalButton = document.querySelector('#decimal');
const oneButton = document.querySelector('#one');
const twoButton = document.querySelector('#two');
const threeButton = document.querySelector('#three');
const fourButton = document.querySelector('#four');
const fiveButton = document.querySelector('#five');
const sixButton = document.querySelector('#six');
const sevenButton = document.querySelector('#seven');
const eightButton = document.querySelector('#eight');
const nineButton = document.querySelector('#nine');
const zeroButton = document.querySelector('#zero');
const inverseButton = document.querySelector('#inverse');
const inputDisplay = document.querySelector('#input');
const previousDisplay = document.querySelector('#previous');

const buttons = document.getElementsByClassName('btn');
for (i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', storeValue);
}


let displayValue = '';
let previousValue = '';
let number1 = null;
let number2 = null;
let operation = '';

function getValue(event){
    const pressedButton = event.target;
    return pressedButton.value;
}

function storeValue(event){
    let eventValue = getValue(event);
    let numberBool = eventValue >= 0;
    if (numberBool){
        eventvalue = eventValue.toString();
        displayValue += eventValue;
        inputDiv.textContent = displayValue;
        number1 = Number(displayValue);
    }
    else {
        processOperator(eventValue);
    }
}


function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if (b == 0){
        return `Be more responsible`;
    }
    return a/b;
}

function exponent(a,b){
    return a**b;
}

function inverse(a){
    return a*-1;
}

function deleteLast(a){
    a = a.toString();
    a = a.slice(0,-1);
    a = Number(a);
    return a;
}

function clearAll(){
    displayValue = '';
    previousValue = '';
    number1 = null;
    number2 = null;
    previousDiv.textContent = '';
    inputDiv.textContent = '';
}

function operate(a,b,operator){
    switch (operator){
        case 'add':
            add(a,b);
            break;
        case 'subtract':
            subtract(a,b);
            break;
        case 'multiply':
            multiply(a,b);
            break;
        case 'divide':
            multiply(a,b);
            break;
        case 'exponent':
            exponent(a,b);
            break;
        case 'inverse':
            inverse(a);
            break;
        case 'delete':
            deleteLast(a);
            break;
    }
}

function getOperator(operator){
    switch (operator){
        case "add":
            operation = '+';
            break;
        case "subtract":
            opereation = '-';
            break;
        case "divide":
            operation = '/';
            break;
        case "mulitply":
            operation = '*';
            break;
    }
}

function processOperator(operator){
    if (number1 == null){
        return;
    }
    if (operator == 'inverse' || operator == 'delete' || operator == 'clear'){
        if (operator == 'inverse'){
            let inversedNum = inverse(number1);
            displayNum = inversedNum.toString();
        }
        else if (operator == 'delete'){
            let deletedNum = deleteLast(number1);
            displayNum = deletedNum.toString();
        }
        else if (operator == 'clear'){
            clearAll();            
        }
    }
    
    operation = getOperator(operator);    

    if (number2 == null){
        number2 = number1;
        previousDisplayStr = displayValue+operation;
        previousDiv.textContent = previousDisplayStr;
    }
    else{
        number1 = operate(number1, number2, operator)
    }
}