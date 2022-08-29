const screen = document.querySelector(".screen");
const onOffBtn = document.getElementById('onOffBtn');
const resultScrn = document.getElementById("resultScrn");
const operatorScrn = document.getElementById('operatorScrn');
let isPower = false;

function toggleOnOff(e) {
  e.preventDefault();
  if (!isPower){
    isPower = true;
    screen.setAttribute('style', 'background: rgb(105, 145, 105); opacity: 100%');
    resultScrn.textContent = "0";
    resultScrn.setAttribute('style', "opacity:50%");
    onOffBtn.innerHTML = '<span> OFF </span>';
    onOffBtn.style.background = 'rgb(112, 7, 3)';
    let onOffBtnSpan = document.querySelector('#onOffBtn > span');
    onOffBtnSpan.style.background= 'rgb(223, 48, 17)';
    onOffBtnSpan.style.color = 'white';
  } else {
    isPower = false;
    screen.setAttribute('style', 'background:black; opacity: 75%');
    resultScrn.textContent = "";
    operatorScrn.textContent= "";
    resetCalc();
    resultScrn.removeAttribute('style');
    onOffBtn.removeAttribute('style');
    onOffBtn.innerHTML = '<span> ON </span>';
    let onOffBtnSpan = document.querySelector('#onOffBtn > span');
    onOffBtnSpan.removeAttribute('style');
  }
}
onOffBtn.addEventListener('click', toggleOnOff, false);

const calcButtons = document.querySelectorAll('.numbers, .operatorBtn');
const operatorBtn = document.querySelectorAll('.operatorBtn');
const numbersBtn = document.querySelectorAll('.numbers');
const deleteBtn = document.getElementById('deleteBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const clearCurrBtn = document.getElementById('clearCurrBtn');

let result;
let numbers = [];
let operator = [];
let tempArray = [];
let keyArray = [];
let isOperator = false;
let decimalPressed = false;
let keyValue = '';

function resetCalc() {
  numbers = [];
  operator = [];
  tempArray = [];
  keyArray = [];
  isOperator = false;
  decimalPressed = false;
  result = '';
  resultScrn.textContent = '';
  operatorScrn.textContent = '';
}

function disableOper() {
  operatorBtn.forEach(button => button.disabled = true);
  isOperator = true;
  keyArray.push(this.value);
  return keyValue = this.value;
}

operatorBtn.forEach(button => button.addEventListener('click', disableOper));
numbersBtn.forEach(button => button.addEventListener('click', () => {
  operatorBtn.forEach(button => button.disabled = false);
}))
calcButtons.forEach(button => button.addEventListener('click', (e) => {
  e.preventDefault();
  getNumbersForCalc(e);
  if (numbers[1]){
    operations();
    operator.shift();
    keyArray.shift();
    numbers = [];
    numbers.push(result);
    resultScrn.setAttribute('style', 'color: black; opacity: 1');
    resultScrn.textContent = result;
    result = '';
    console.log(result);
  }
})); 


function getNumbersForCalc(e){
  if (isPower) {
    if (tempArray.length < Infinity) {
      let tempNum = 0;
      if (tempArray[1] && tempArray[0] ==='0')
        tempArray.shift();
      else 
        tempArray.push(e.target.textContent);
      if (isOperator) {
        if (tempArray[0]) {
          tempNum = tempArray.slice(0, tempArray.length-1).join("");
          numbers.push(tempNum);
        }
        isOperator = false;
        let popped = tempArray.pop();
        operator.push(popped);
        tempArray.length = 0;
      } else 
        changeTopScreen();
    }
  }
}

//put current calculations on top display
function changeTopScreen() {
  if (!numbers[0]) {
    if (tempArray[0] === '0')
      tempArray.pop();
    else
      operatorScrn.textContent = tempArray.join("");
  } else {
    if (numbers[0]) {
      operatorScrn.innerHTML = `${numbers[0]} ${operator[0]} ${tempArray.join("")} =`;
    } else {
      operatorScrn.textContent = tempArray.join("");
    }
  }
}

function deleteLast() {
  if (tempArray[0]){
    tempArray.pop();
    changeTopScreen();
  }
}

function deleteCurr() {
  tempArray = [];
  changeTopScreen();
}

deleteBtn.addEventListener('click', deleteLast);
clearCurrBtn.addEventListener('click', deleteCurr);
clearAllBtn.addEventListener('click', resetCalc);

function operations(){
  if(isPower){
    switch(keyArray[0]){
      case "+":
          if (result) 
            result =+ parseFloat(numbers[1]);
          else if (numbers[1])
            result = (parseFloat(numbers[0]) + parseFloat(numbers[1])).toFixed(2);
        break
       
      case "-":
        if (numbers[1])
          if (result) 
            result =- parseFloat(numbers[1]);
          else if (numbers[1])
            result = (parseFloat(numbers[0]) - parseFloat(numbers[1])).toFixed(2);
        break;

       case "*":
        if (numbers[1])
          if (result) 
            result *= parseFloat(numbers[1]);
          else if (numbers[1])
            result = ((parseFloat(numbers[0]) * parseFloat(numbers[1]))).toFixed(2);
        break;

       case "/":
        if (numbers[1])
          if (result) 
            result = (result/parseFloat(numbers[1])).toFixed(2);
          else if (numbers[1])
            result = (parseFloat(numbers[0])/parseFloat(numbers[1])).toFixed(2);
        break;
      }
    }
  }
