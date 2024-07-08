let row = 15;
let col = 15;
let obstacleProbability = 0.1; // 30% probability for a cell to be an obstacle

// Function to display the grid
function displayGrid(rows, cols) {
    const gridContainer = document.getElementById("grid");

    for (let i = 0; i < rows; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        for (let j = 0; j < cols; j++) {
            const cellDiv = document.createElement("div");
            cellDiv.className = "cell";

            // Randomly determine if this cell is an obstacle
            if (Math.random() < obstacleProbability) {
                cellDiv.classList.add("obstacle");
            } else {
                cellDiv.classList.add("walkable");
            }

            rowDiv.appendChild(cellDiv);
        }

        gridContainer.appendChild(rowDiv);
    }
}

// Call the function to display the grid
displayGrid(row, col);
