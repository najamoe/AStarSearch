let row = 15;
let col = 15;

// Function to display the grid
function displayGrid(rows, cols) {
    const gridContainer = document.getElementById("grid");

    for (let i = 0; i < rows; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        for (let j = 0; j < cols; j++) {
            const cellDiv = document.createElement("div");
            cellDiv.className = "cell";
            rowDiv.appendChild(cellDiv);
        }

        gridContainer.appendChild(rowDiv);
    }
}

// Call the function to display the grid
displayGrid(row, col);