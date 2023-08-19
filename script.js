const container = document.querySelector('.container');
const slider = document.querySelector('.slider');
const sizeVal = document.querySelector('.grid-size');
const picker = document.querySelector('.current-color');
const clear = document.querySelector('.clear');
const dark = document.querySelector('.darken');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
let color = 'black';
let mouseDown = false;
let option = 'color';
createGrid(slider.value);

document.body.addEventListener('mousedown', () => {
    mouseDown = true;
});
document.body.addEventListener('mouseup', () => {
    mouseDown = false;
});

// Darkening by 10%
dark.addEventListener('click', () => {
    rgb = hexToRgb(color);
    option = 'dark';
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
                if (option == 'color') {
                    col.style.backgroundColor = color;
                } else if (option == 'dark') {
                    rgb = hexToRgb(color);
                    color = `rgb(${rgb.r * 0.9}, ${rgb.g * 0.9}, ${rgb.b * 0.9})`;
                    col.style.backgroundColor = color;
                    color = rgbToHex(rgb.r * 0.9, rgb.g * 0.9, rgb.b * 0.9);
                }
            });
            col.addEventListener('mouseover', () => {
                if (mouseDown) { 
                    if (option == 'color') {
                        col.style.backgroundColor = color;
                    } else if (option == 'dark') {
                        rgb = hexToRgb(color);
                        color = `rgb(${rgb.r * 0.9}, ${rgb.g * 0.9}, ${rgb.b * 0.9})`;
                        col.style.backgroundColor = color;
                        color = rgbToHex(rgb.r * 0.9, rgb.g * 0.9, rgb.b * 0.9);
                    }
                }
            });
            
            col.classList.add('cell');
            row.appendChild(col);
        }
        container.appendChild(row);
    }
}

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }