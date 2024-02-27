window.onload = function () {
    // Your existing JavaScript code here
    const container = document.querySelector('.container');
    const colorMode = document.querySelector('.color-mode');
    const dark = document.querySelector('.darken');
    const rainbow = document.querySelector('.rainbow');
    const clear = document.querySelector('.clear');
    const slider = document.querySelector('.slider');
    const sizeVal = document.querySelector('.grid-size');
    const picker = document.querySelector('.current-color');
    const undo = document.querySelector('.undo');
    const redo = document.querySelector('.redo');
    const saveBtn = document.querySelector('.save');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    let option = 'color';
    let color = 'black';
    let gridState = [];
    let redoState = [];
    let mouseDown = false;

    createGrid(slider.value);
    clicked(colorMode);

    container.addEventListener('mousedown', (event) => {
        if (!event.target.classList.contains('cell')) {
            return; // Ignore mousedown outside cells
        }
        mouseDown = true;
        changeColor(event.target);
    });

    container.addEventListener('mouseover', (event) => {
        if (mouseDown && event.target.classList.contains('cell')) {
            changeColor(event.target);
        }
    });

    container.addEventListener('mouseup', () => {
        mouseDown = false;
    });

    document.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // Prevent context menu on right-click
    });

    document.addEventListener('selectstart', (event) => {
        if (!container.contains(event.target)) {
            event.preventDefault(); // Prevent text selection outside the grid
        }
    });

    undo.addEventListener('click', () => {
        undoChange();
    });

    redo.addEventListener('click', () => {
        redoChange();
    });

    saveBtn.addEventListener('click', () => {
        saveCanvas();
    });

    colorMode.addEventListener('click', () => {
        color = picker.value;
        option = 'color';
        clicked(colorMode);
        unclick([dark, rainbow]);
        saveToHistory();
    });

    dark.addEventListener('click', () => {
        option = 'dark';
        clicked(dark);
        unclick([colorMode, rainbow]);
        saveToHistory();
    });

    rainbow.addEventListener('click', () => {
        option = 'rainbow';
        clicked(rainbow);
        unclick([dark, colorMode]);
        saveToHistory();
    });

    clear.addEventListener('click', () => {
        undoChange(); // Revert to the previous state before clearing the grid
        createGrid(slider.value);
        saveToHistory();
    });

    picker.addEventListener('input', () => {
        color = picker.value;
        saveToHistory();
    });

    slider.addEventListener('input', () => {
        undoChange(); // Revert to the previous state before changing the grid size
        createGrid(slider.value);
        sizeVal.innerText = `${slider.value} x ${slider.value}`;
        saveToHistory();
    });
    
    function saveCanvas() {
        const container = document.querySelector('.container');
        
        if (!container) {
            console.error("Container element not found.");
            return;
        }
        
        html2canvas(container).then(canvas => {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'canvas_image.png';
    
            link.click();
            
            console.log("Save process completed.");
        });
    }
    
    
    
    function createGrid(numOfSquares) {
        container.innerHTML = "";
        for (let i = 0; i < numOfSquares; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
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

    function undoChange() {
        if (gridState.length > 1) {
            // Remove the last grid state from history
            redoState.push(gridState.pop());
            // Restore the previous grid state
            container.innerHTML = gridState[gridState.length - 1];
        }
    }

    function redoChange() {
        if (redoState.length > 0) {
            const nextState = redoState.pop();
            container.innerHTML = nextState;
            gridState.push(nextState);
        }
    }

    function changeColor(col) {
        if (mouseDown) {
            const currentState = container.innerHTML;
            if (option === 'dark') {
                let rgb = hexToRgb(color);
                color = rgbToHex(rgb.r * 0.9, rgb.g * 0.9, rgb.b * 0.9);
            } else if (option === 'rainbow') {
                let rVal = Math.floor(Math.random() * 255);
                let gVal = Math.floor(Math.random() * 255);
                let bVal = Math.floor(Math.random() * 255);
                color = rgbToHex(rVal, gVal, bVal);
            }
            col.style.backgroundColor = color;
            saveToHistory();
            redoState = []; // Clear redo history after making a new change
        }
    }

    function clicked(btn) {
        btn.style.transform = 'translate-y(3px)';
        btn.style.fontWeight = 'bold';
        btn.style.color = 'white';
        btn.style.backgroundColor = 'gray';
    }

    function unclick(btns) {
        btns.forEach(btn => {
            btn.style.fontWeight = 'normal';
            btn.style.color = 'black';
            btn.style.backgroundColor = '#F0F0F0';
        });
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

    function saveToHistory() {
        const currentState = container.innerHTML;
        gridState.push(currentState);
        redoState = []; // Clear redo history when a new change is made
    }


};

