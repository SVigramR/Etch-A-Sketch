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
const hexPrompt = document.getElementById("hexPrompt");
const rgbPrompt = document.getElementById("rgbPrompt");
const hslPrompt = document.getElementById("hslPrompt");

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => refreshSize(e.target.value);
clearBtn.onclick = () => refresh();
colorPicker.oninput = (e) => setColor(e.target.value);
colorBtn.onclick = () => setMode('color');
eraserBtn.onclick = () => setMode('eraser');
rainbowBtn.onclick = () => setMode('rainbow');
redBtn.onclick = () => setMode('red');
greenBtn.onclick = () => setMode('green');
blueBtn.onclick = () => setMode('blue');
rgBtn.onclick = () => setMode('redgreen');
gbBtn.onclick = () => setMode('greenblue');
brBtn.onclick = () => setMode('bluered');
hexPrompt.onclick = () => updateHex(prompt("Type your HEX Input: \nHint: #00ff22"));
rgbPrompt.onclick = () => updateRgb(prompt("Type your RGB Input: \nHint: rgb(0,0,0)"));
hslPrompt.onclick = () => updateHsl(prompt("Type your HSL Input: \nHint: hsl(360,100%,50%)"));

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

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function rgbToHex(singleColor) {
    let hexConv = singleColor.toString(16);
    return hexConv.length == 1 ? "0" + hexConv : hexConv;
}

function updateHsl(hsl) {
    let regHsl = /^hsl\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%\)$/,
        HSL = hsl.substring(hsl.indexOf('(') +1, hsl.length -1).split(','),
        h = parseInt(HSL[0]),
        s = parseInt(HSL[1]),
        l = parseInt(HSL[2]),
        hex = hslToHex(h,s,l); 

    if(regHsl.test(hsl) === true){
        setColor(hex);
        setMode('color');
        colorPicker.value = hex;
    } else if(hsl === ""){
        alert("Empty Input");
    } else {
        alert("Invalid Input");
    }
}

function updateRgb(rgb) {
    let regRgb = /^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/,
        RGB = rgb.substring(rgb.indexOf('(') +1, rgb.length -1).split(','),
        r = parseInt(RGB[0]),
        g = parseInt(RGB[1]),
        b = parseInt(RGB[2]),
        rgbJoin = "#" + rgbToHex(r) + rgbToHex(g) + rgbToHex(b);
    
    if(regRgb.test(rgb) === true){
        setColor(rgbJoin);
        setMode('color');
        colorPicker.value = rgbJoin;
    } else if(rgb === ""){
        alert("Empty Input");
    } else {
        alert("Invalid Input");
    }
}

function updateHex(hex) {
    let regHex = /^#[0-9A-F]{6}$/i;
    if(regHex.test(hex) === true) {
        setColor(hex);
        setMode('color');
        colorPicker.value = hex;
    } else if (hex.length > 7){
        alert("Your input exceeds");
    } else if (hex === ""){
        alert("Empty Input");
    } else {
        alert("Invalid Input");
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow'){
        e.target.style.backgroundColor = `rgb(${random(256)}, ${random(256)}, ${random(256)})`;
    } else if (currentMode === 'eraser'){
        e.target.style.backgroundColor = '#ffffff';
    } else if (currentMode === 'color'){
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'red'){
        e.target.style.backgroundColor = `rgb(${random(256)}, 0, 0)`;
    } else if (currentMode === 'green'){
        e.target.style.backgroundColor = `rgb(0, ${random(256)}, 0)`;
    } else if (currentMode === 'blue'){
        e.target.style.backgroundColor = `rgb(0, 0, ${random(256)})`;
    } else if (currentMode === 'redgreen'){
        e.target.style.backgroundColor = `rgb(${random(256)}, ${random(256)}, 0)`;
    } else if (currentMode === 'greenblue'){
        e.target.style.backgroundColor = `rgb(0, ${random(256)}, ${random(256)})`;
    } else if (currentMode === 'bluered'){
        e.target.style.backgroundColor = `rgb(${random(256)}, 0, ${random(256)})`;
    }
}


function activateBtn(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    } else if (currentMode === 'red') {
        redBtn.classList.remove('active');
    } else if (currentMode === 'green') {
        greenBtn.classList.remove('active');
    } else if (currentMode === 'blue') {
        blueBtn.classList.remove('active');
    } else if (currentMode === 'redgreen') {
        rgBtn.classList.remove('active');
    } else if (currentMode === 'greenblue') {
        gbBtn.classList.remove('active');
    } else if (currentMode === 'bluered') {
        brBtn.classList.remove('active');
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active');
    } else if (newMode === 'color') {
      colorBtn.classList.add('active');
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active');
    } else if (newMode === 'red') {
        redBtn.classList.add('active');
    } else if (newMode === 'green') {
        greenBtn.classList.add('active');
    } else if (newMode === 'blue') {
        blueBtn.classList.add('active');
    } else if (newMode === 'redgreen') {
        rgBtn.classList.add('active');
    } else if (newMode === 'greenblue') {
        gbBtn.classList.add('active');
    } else if (newMode === 'bluered') {
        brBtn.classList.add('active');
    }
}

window.onload = () => {
    makeGrids(currentSize);
    activateBtn(currentMode);
}