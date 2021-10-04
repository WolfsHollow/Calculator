//#region Initialize variables and set up DOM
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
//#endregion

const buttons = document.getElementsByClassName('btn');
for (i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', storeValue);
}

document.addEventListener('keypress', keyboardInputs);

let displayValue = '';
let previousDisplayStr = '';
let number1 = null;
let number2 = null;
let operation = null;



function getValue(event){ //gets button value
    const pressedButton = event.target;
    return pressedButton.value;
}

function keyboardInputs(e){
    let keyPressed = e.key;
    console.log(keyPressed);

    if (keyPressed >= 0 || keyPressed == '+' || keyPressed == '-' || keyPressed == '*' || keyPressed == '/' || keyPressed == '.'){
        storeValue(keyPressed);   
        return;
    } 
    else {
        switch (keyPressed){
            case 'Enter':
                keyPressed = '=';
                console.log(`enter, ${keyPressed}`);
                break;
            case 'Delete':
                keyPressed = 'delete';
                console.log(`enter, ${keyPressed}`);
                break;
        }
    }
    storeValue(keyPressed);
    return;
}

function storeValue(event){ //processes the value
    let eventValue = null;
    if (event.length){
        eventValue = event;
    }
    else{
        eventValue = getValue(event);
    }
    console.log(`the event value is ${eventValue}`);
    let numberBool = eventValue >= 0;
    if (numberBool || eventValue == '.'){
        if (numberBool){        
            eventvalue = eventValue.toString();
            displayValue += eventValue;
            inputDiv.textContent = displayValue;
            number1 = Number(displayValue);
        }
        else if (eventValue == '.') {
            if (number1 == null){
                displayValue += '0.';
                inputDiv.textContent = displayValue;
                number1 = Number(displayValue);
            }
            else {
                displayValue += '.';
                inputDiv.textContent = displayValue;
                number1 = Number(displayValue);
            }
        }
    }
    else {
        processOperator(eventValue);
    }
}

//#region Operations
function add(a,b){ 
    console.log(`adding ${a} and ${b}`)
    return a+b;
}

function subtract(a,b){
    return b-a;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if (a == 0){
        return `Be more responsible`;
    }
    return b/a;
}

function exponent(a,b){
    return a**b;
}

function inverse(a){ //gives inverse
    return a*-1;
}

function deleteLast(a){ //deletes last inputted number
    a = a.toString();
    a = a.slice(0,-1);
    a = Number(a);
    if (a == 0){
        a = ''
    }
    return a;
}

function clearAll(){ // resets everything
    displayValue = '';
    previousDisplayStr = '';
    number1 = null;
    number2 = null;
    operation = null;
    previousDisplayStr = '';
    previousDiv.textContent = '';
    inputDiv.textContent = '';    
}

//#endregion

function roundResult(number){
    return Math.round(number*1000)/1000;
}

function operate(a,b,operator){ //gets the operated value
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

function processOperator(operator){ //processes an operator pressed
    // if num1 does not exist
    if (number1 == null){
        if (number2 == null){ // do nothing if no other numbers pressed
            return;
        }
        //change operator to selected operator
        else if (operator == '+' || operator == '*' || operator == '/' || operator == '-'){
            previousDisplayStr = previousDisplayStr.slice(0,previousDisplayStr.length-1)
            operation = operator;
            previousDisplayStr += ` ${operation}`; 
            previousDiv.textContent = previousDisplayStr;
            displayValue = '';
            return;
        }
        
    }

    //#region inverse/delete/clear/equals
    if (operator == 'inverse' || operator == 'delete' || operator == 'clear' || operator == '='){
        switch (operator){
            case 'inverse':
                if (number1 != null){
                    let inversedNum = inverse(number1);
                    number1 = inversedNum;
                    displayValue = inversedNum.toString();
                    inputDiv.textContent = displayValue;
                    return;
                }
                else if (displayValue != '') {
                    let inversedNum = inverse(number2);
                    number1 = inversedNum;
                    number2 = null;
                    displayValue = inversedNum.toString();
                    inputDiv.textContent = displayValue;
                    return; 
                }
                return;
            case 'delete':
                if (number1 != null){
                    let deletedNum = deleteLast(number1);
                    number1 = deletedNum;
                    displayValue = deletedNum.toString();
                    inputDiv.textContent = displayValue;
                }
                return;
            case 'clear':
                clearAll();
                return;
            case '=':
                if (number1 && previousDisplayStr){
                    previousDisplayStr += ` ${number1} =`;
                    previousDiv.textContent = previousDisplayStr;
                    number2 = operate(number1,number2,operation);
                    previousDisplayStr = `${number2} ${operation}`;
                    displayValue = roundResult(number2);
                    inputDiv.textContent = displayValue; 
                    number1 = null;
                    operation = null;
                    return;      
                }          
               return;                                
        }
    }    
    //#endregion

    if (operation != null && number2 != null){
        number1 = operate(number1, number2, operation);
        inputDiv.textContent = roundResult(number1);
        operation = operator;    
        previousDisplayStr = `${number1} ${operation}`;
        previousDiv.textContent = previousDisplayStr;  
        number2 = number1;
        number1 = null;
        operation = null;
        displayValue = '';
    }

    operation = operator;    

    if (number2 == null){
        number2 = number1;
        number1 = null;
        previousDisplayStr = `${displayValue} ${operation}`;
        displayValue = '';
        previousDiv.textContent = previousDisplayStr;
        inputDiv.textContent = displayValue;
    }
}