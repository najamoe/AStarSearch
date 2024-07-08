let row = 15;
let col = 15;
let obstacleProbability = 0.1; 
let startNode = { row: 0, col: 0 }; 
let endNode = null; 

// Function to display the grid
function displayGrid(rows, cols) {
    const gridContainer = document.getElementById("grid");

    for (let i = 0; i < rows; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        for (let j = 0; j < cols; j++) {
            const cellDiv = document.createElement("div");
            cellDiv.className = "cell";

            // Set class for start position (0, 0)
            if (i === startNode.row && j === startNode.col) {
                cellDiv.classList.add("start");
            }

            // Randomly determine if this cell is an obstacle
            if (Math.random() < obstacleProbability && !(i === startNode.row && j === startNode.col)) {
                cellDiv.classList.add("obstacle");
            } else {
                cellDiv.classList.add("walkable");
            }

            // Add event listener for selecting end node
            cellDiv.addEventListener('click', function() {
                if (!endNode) {
                    endNode = { row: i, col: j };
                    cellDiv.classList.add("end");
                }
            });

            rowDiv.appendChild(cellDiv);
        }

        gridContainer.appendChild(rowDiv);
    }
}

// Call the function to display the grid
displayGrid(row, col);
