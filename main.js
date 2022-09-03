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
const decimalBtn = document.getElementById('decimalBtn');

let result = '';
const numbers = [];
const operator = []; //operator for display screen
const tempArray = [];
const keyArray = []; //operator used in operations
let isOperator = false;
let keyValue = '';

function resetCalc() {
  numbers.length = 0;
  operator.length = 0;
  tempArray.length = 0;
  keyArray.length = 0;
  isOperator = false;
  result = '';
  resultScrn.textContent = '0';
  operatorScrn.textContent = '';
  numbersBtn.forEach(button => button.disabled = false);
  decimalBtn.disabled = false;
}

function disableOper() {
  operatorBtn.forEach(button => button.disabled = true);
  numbersBtn.forEach(button => button.disabled = false);
  isOperator = true;
  decimalBtn.disabled = false;
  keyArray.push(this.value);
  if (keyArray[0] === "="){
    keyArray.shift();
  }
  return keyValue = this.value;
}

operatorBtn.forEach(button => button.addEventListener('click', disableOper));
numbersBtn.forEach(button => button.addEventListener('click', () => {
  operatorBtn.forEach(button => button.disabled = false);
  decimalBtn.disabled = false;
  isOperator = false;
}))
calcButtons.forEach(button => button.addEventListener('click', (e) => {
  e.preventDefault();
  getNumbersForCalc(e);
  if (numbers[1]){
    operations();
    updateResult();
    }
}));

function updateResult(){
  operator.shift();
  keyArray.shift();
  numbers.length = 0;
  if (result.length > 14)  // so result will not go past bottom screen container
  result = parseFloat(result).toPrecision(8);
  numbers.push(result);
  resultScrn.setAttribute('style', 'color: black; opacity: 1');
  resultScrn.textContent = result;
  result = '';
}

function getNumbersForCalc(e){
  if (isPower) {
    if (tempArray.length < Infinity) {
      let tempNum;
      tempArray.push(e.target.textContent);
      if (isOperator) {
        if (tempArray) {
          tempNum = tempArray.slice(0, tempArray.length-1).join("");
          if (tempNum !== "")  
            numbers.push(tempNum);
          if (keyValue === "="){
            operatorBtn.forEach(button => button.disabled = false);
            numbersBtn.forEach(button => button.disabled = true);
            decimalBtn.disabled = true;
          } else {
            let popped = tempArray.pop();
            if (popped != "=") operator.push(popped);
          }
          tempArray.length = 0;
        }
      } else 
        changeTopScreen();
    }
  }
}

//put current calculations on top display
function changeTopScreen() {
  if (!numbers[0]) {
    if (tempArray.length === 0)
      operatorScrn.textContent = ''; 
    else 
      operatorScrn.textContent = parseFloat(tempArray.join(""));
  } else if (numbers[0] && operator[0] && tempArray[0]) {
    operatorScrn.textContent = `${parseFloat(numbers[0])} ${operator[0]} ${parseFloat(tempArray.join(""))} =`; 
  } else if (numbers[0] && operator[0])
  operatorScrn.textContent = `${parseFloat(numbers[0])} ${operator[0]} =`
}

function deleteLast() {
  if (tempArray){
    tempArray.pop();
    changeTopScreen();
  }
}

function deleteCurr() {
  if (tempArray.length === 0){ //delete current operation if messed up
    operator.length = 0;
    keyArray.length = 0;
  } else {
    tempArray.length = 0;
  }
  changeTopScreen();
}

deleteBtn.addEventListener('click', deleteLast);
clearCurrBtn.addEventListener('click', deleteCurr);
clearAllBtn.addEventListener('click', resetCalc);

function operations(){
  if(isPower){
    switch(keyArray[0]){
      case "+":
        result = (parseFloat(numbers[0]) + parseFloat(numbers[1])).toFixed(3);
      break
       
      case "-":
        result = (parseFloat(numbers[0]) - parseFloat(numbers[1])).toFixed(3);
      break;

      case "*":
        result = ((parseFloat(numbers[0]) * parseFloat(numbers[1]))).toFixed(3);
      break;

      case "/":
        if (numbers[1] === "0") {  //resets calculator after 1.5s if error from dividing by 0
          result = "Error"
          setTimeout(() => {
            resetCalc();
          }, 1500);
        } else 
          result = ((parseFloat(numbers[0])/parseFloat(numbers[1])).toFixed(3));
      break;

      case "nPower":
        result = Math.pow(parseFloat(numbers[0]), parseFloat(numbers[1])).toFixed(3);
      break;
     }
    }
  }

const sqRootBtn = document.getElementById('sqRootBtn');
function sqRoot() {
  if (!numbers[0])
   return;
  else {
    operatorScrn.innerHTML = `${sqRootBtn.textContent}${numbers[0]}`;
    result = Math.sqrt(parseFloat(numbers[0])).toFixed(3);
    if (result === "NaN") {
      resultScrn.textContent = "NaN";
      setTimeout(() => {
        resetCalc();
      }, 1500);
    } else {
      tempArray.length = 0;
      operatorBtn.forEach(button => button.disabled = false);
      numbersBtn.forEach(button => button.disabled = true);
      decimalBtn.disabled = true;
      updateResult();
    }
  }
}
sqRootBtn.addEventListener('click', sqRoot);

decimalBtn.addEventListener('click', () =>{
  decimalBtn.disabled = true;
  isOperator = false;
  if (tempArray.includes(".")){
    return;
  } else
    tempArray.push(".");
})