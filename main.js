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
    resultScrn.removeAttribute('style');
    onOffBtn.removeAttribute('style');
    onOffBtn.innerHTML = '<span> ON </span>';
    let onOffBtnSpan = document.querySelector('#onOffBtn > span');
    onOffBtnSpan.removeAttribute('style');
    
  }
}

onOffBtn.addEventListener('click', toggleOnOff);


