const container = document.querySelector('.container');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

createGrid(16);

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
            col.classList.add('cell');
            row.appendChild(col);
        }

        container.appendChild(row);
    }
}

// Dynamically change size of grid using slider
const slider = document.querySelector('.slider');
slider.addEventListener('input', () => {
    createGrid(slider.value);
    console.log(typeof slider.value);
});