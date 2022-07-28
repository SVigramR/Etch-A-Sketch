let currentColor = "#333333";
let currentMode = 'color';
let currentSize = 16;

function setColor(newColor) {
    currentColor = newColor;
}

function setMode(newMode) {
    activateBtn(newMode);
    currentMode = newMode;
}

function setSize(newSize) {
    currentSize = newSize;
}

const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const eraserBtn = document.getElementById('eraserBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const clearBtn = document.getElementById('clearBtn');
const container = document.getElementById("container");
const redBtn = document.getElementById("redBtn");
const greenBtn = document.getElementById("greenBtn");
const blueBtn = document.getElementById("blueBtn");
const rgBtn = document.getElementById("redGreenBtn");
const gbBtn = document.getElementById("greenBlueBtn");
const brBtn = document.getElementById("blueRedBtn");

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => refreshSize(e.target.value);
clearBtn.onclick = () => refresh();
colorPicker.oninput = (e) => setColor(e.target.value);
colorBtn.onclick = () => setMode('color');
eraserBtn.onclick = () => setMode('eraser');
rainbowBtn.onclick = () => setMode('rainbow');

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function refreshSize(value) {
    setSize(value);
    updateSizeValue(value);
    refresh();
}

function refresh() {
    container.innerHTML = '';
    makeGrids(currentSize);
}


function makeGrids(size) {
    container.style.setProperty("--grid-rows", size);
    container.style.setProperty("--grid-cols", size);
    for(let i = 0; i < size * size; i++){
        let grid = document.createElement('div');
        grid.classList.add("grid");
        grid.addEventListener('mouseover', changeColor);
        grid.addEventListener('mousedown', changeColor);
        container.appendChild(grid);
    }
}

function random(num) {
    return Math.floor(Math.random() * num);
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow'){
        e.target.style.backgroundColor = `rgb(${random(256)}, ${random(256)}, ${random(256)})`;
    } else if (currentMode === 'eraser'){
        e.target.style.backgroundColor = '#ffffff';
    } else if (currentMode === 'color'){
        e.target.style.backgroundColor = currentColor;
    }
}

function activateBtn(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active');
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active');
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active');
    } else if (newMode === 'color') {
      colorBtn.classList.add('active');
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active');
    }
}

window.onload = () => {
    makeGrids(currentSize);
    activateBtn(currentMode);
}