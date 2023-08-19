const container = document.querySelector('.container');
const slider = document.querySelector('.slider');
const sizeVal = document.querySelector('.grid-size');
const picker = document.querySelector('.current-color');
const clear = document.querySelector('.clear');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
let color = 'black';
let mouseDown = false;
createGrid(slider.value);

document.body.addEventListener('mousedown', () => {
    mouseDown = true;
});
document.body.addEventListener('mouseup', () => {
    mouseDown = false;
});

// Color picker option for users
picker.addEventListener('input', () => {
    color = picker.value;
});

// Dynamically change size of grid using slider
slider.addEventListener('input', () => {
    createGrid(slider.value);
    sizeVal.innerText = `${slider.value} x ${slider.value}`;
});

// Clear grid
clear.addEventListener('click', () => {
    createGrid(slider.value);
});

function createGrid(numOfSquares) {
    container.innerHTML = "";
    for (let i = 0; i < numOfSquares; i++) {
        const row = document.createElement('div');
        row.classList.add(`row${i}`);
        row.style.display = 'flex';
        row.style.margin = 0;
        row.style.width = `${containerWidth}px`;
        row.style.height = `${containerHeight / numOfSquares}px`;

        for (let j = 0; j < numOfSquares; j++) {
            const col = document.createElement('div');
            col.style.width = `${containerWidth / numOfSquares}px`;
            col.style.height = `${containerHeight / numOfSquares}px`;
            
            col.addEventListener('mousedown', () => {
                col.style.backgroundColor = color;
            });
            col.addEventListener('mouseover', () => {
                if (mouseDown)
                    col.style.backgroundColor = color;
            });
            
            col.classList.add('cell');
            row.appendChild(col);
        }
        container.appendChild(row);
    }
}