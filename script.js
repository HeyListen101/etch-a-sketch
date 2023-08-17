// Create a 16 x 16 grid of div elements
// Create a 16 row divs
// Create 16 divs inside each row
// Row divs must flex vertically
// Column divs must flex horizontally

const container = document.querySelector('.container');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

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

createGrid(16);

const setSzBtn = document.querySelector('.setSize');

setSzBtn.addEventListener('click', () => {
    let size = 0;
    do {
        size = prompt('Enter Size (n) of Grid (n x n): ');
    } while (size > 100);

    createGrid(size);
});

