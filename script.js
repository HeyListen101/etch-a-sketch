// Create a 16 x 16 grid of div elements
// Create a 16 row divs
// Create 16 divs inside each row
// Row divs must flex vertically
// Column divs must flex horizontally

const container = document.querySelector('.container');

for (let i = 0; i < 16; i++) {
    const row = document.createElement('div');
    row.classList.add(`row${i}`);
    row.style.display = 'flex';
    row.style.margin = 0;
    row.style.width = '640px';
    row.style.height = '40px';

    for (let j = 0; j < 16; j++) {
        const col = document.createElement('div');
        col.style.width = '40px';
        col.style.height = '40px';
        row.appendChild(col);
    }

    container.appendChild(row);
}