// Displaying on-update range value
const sliderOutput = document.getElementById("sliderOutput");
const myRange = document.getElementById("myRange");
sliderOutput.textContent = myRange.value;
myRange.oninput = function(){
    sliderOutput.textContent = this.value;
};


// To make grids
const container = document.getElementById("container");
let rows = document.getElementsByClassName("grid");

function makeGrids(row, col) {
    container.style.setProperty("--grid-rows", row);
    container.style.setProperty("--grid-cols", col);
    for(let i = 0; i < (row * col); i++){
        let grid = document.createElement('div');
        container.appendChild(grid).className="grid";
    }
}