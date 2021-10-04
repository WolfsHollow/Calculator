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
let operation1 = null;
let operation2 = null;

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
    console.log(`adding ${a} and ${b}`)
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
    console.log(`number1: ${a}, number2: ${b}, operator: ${operator}`);
    switch (operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        case 'exponent':
            return exponent(a,b);
    }
}

function getOperator(operator){
    console.log(operator);
    switch (operator){
        case "add":
            operation = '+';
            return operation;
        case "subtract":
            operation = '-';
            return operation;
        case "divide":
            operation = '/';
            return operation;
        case "multiply":
            operation = '*';
            return operation;
        case "equals":
            operation = '=';
            return operation;
    }
    console.log('we didnt break');
}

function processOperator(operator){
    if (number1 == null && number2 == null){
        return;
    }
    if (operator == 'inverse' || operator == 'delete' || operator == 'clear' || operator == 'equals'){
        switch (operator){
            case 'inverse':
                let inversedNum = inverse(number1);
                number1 = inversedNum;
                displayValue = inversedNum.toString();
                inputDiv.textContent = displayValue;
                return;
            case 'delete':
                let deletedNum = deleteLast(number1);
                number1 = deletedNum;
                displayValue = deletedNum.toString();
                inputDiv.textContent = displayValue;
                return;
            case 'clear':
                clearAll();
                return;
            case 'equals':
                previousDisplayStr += ` ${number1} =`;
                previousDiv.textContent = previousDisplayStr;
                number2 = operate(number1,number2,operation1);
                displayValue = number2;
                number1 = null;
                inputDiv.textContent = displayValue; 
                return;                           
        }
    }
    
    if (operation1 != null && number2 != null){
        operation2 = operation1;
        console.log(`operation ${operation1} of ${number1} and ${number2} is`);
        number1 = operate(number1, number2, operation1);
        console.log(number1);
        inputDiv.textContent = number1;
        previousDiv.textContent = number1+operation2;  
    }

    operation1 = getOperator(operator);    

    if (number2 == null){
        number2 = number1;
        number1 = null;
        previousDisplayStr = `${displayValue} ${operation1}`;
        displayValue = '';
        previousDiv.textContent = previousDisplayStr;
        inputDiv.textContent = displayValue;
    }
    /*else{
        console.log(number1 + ' ' + operator + " " + number2);
        number1 = operate(number1, number2, operator)
        console.log(number1)
        inputDiv.textContent = number1;
    }*/
}