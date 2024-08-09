let row = 15;
let col = 15;
let obstacleProbability = 0.1;
let endNode = { row: 0, col: 0 };
let startNode = null;
let gridData = createGrid(row, col, obstacleProbability);

    function createGrid(rows, cols, obstacleProb) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
        row.push({
            row: i,
            col: j,
            walkable:
            Math.random() >= obstacleProb ||
            (i === endNode.row && j === endNode.col),
        });
        }
        grid.push(row);
    }
    return grid;
    }

    function displayGrid(rows, cols) {
        const gridContainer = document.getElementById("grid");
        gridContainer.innerHTML = "";
      
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const cellDiv = document.createElement("div");
            cellDiv.className = "cell";
            cellDiv.dataset.row = i;
            cellDiv.dataset.col = j;
      
            const cellData = gridData[i][j];
      
            // Set class for endNode 
            if (i === endNode.row && j === endNode.col) {
              cellDiv.classList.add("end");
              cellDiv.textContent = "B";
            } else if (!cellData.walkable) {
              cellDiv.classList.add("obstacle");
            } else {
              cellDiv.classList.add("walkable");
            }
      
            // Event listener for selecting startNode
            cellDiv.addEventListener("click", function () {
              if (!startNode) {
                startNode = { row: i, col: j };
                cellDiv.classList.add("start"); 
                cellDiv.textContent = "A";
                updateGridDisplay(openSet, closedSet); 
              }
            });
      
            // Placeholders for g, h, f values
            if (!(i === endNode.row && j === endNode.col)) {
              const gDiv = document.createElement("div");
              gDiv.className = "cost g-cost";
        
              const hDiv = document.createElement("div");
              hDiv.className = "cost h-cost";
        
              const fDiv = document.createElement("div");
              fDiv.className = "cost f-cost";
        
              // Check if the cell is startNode
              if (startNode && i === startNode.row && j === startNode.col) {
                gDiv.textContent = `g: `;
                hDiv.textContent = `h: `;
                fDiv.textContent = `f: `;
              }
        
              cellDiv.appendChild(gDiv);
              cellDiv.appendChild(hDiv);
              cellDiv.appendChild(fDiv);
            }
      
            gridContainer.appendChild(cellDiv);
          }
        }
      }
      
   

function updateGridDisplay(openSet, closedSet) {
  const gridContainer = document.getElementById("grid");
  const cells = gridContainer.getElementsByClassName("cell");

  for (const cell of cells) {
    cell.classList.remove("open", "closed", "start");
    const gDiv = cell.querySelector(".g-cost");
    const hDiv = cell.querySelector(".h-cost");
    const fDiv = cell.querySelector(".f-cost");

    const isStartNode =
      cell.dataset.row == startNode.row && cell.dataset.col == startNode.col;

    if (!isStartNode) {
      if (gDiv) gDiv.textContent = "g: ";
      if (hDiv) hDiv.textContent = "h: ";
      if (fDiv) fDiv.textContent = "f: ";
    }
  }

  for (const node of closedSet) {
    const cell = cells[node.row * col + node.col];
    cell.classList.add("closed");
    updateCostDisplay(cell, node);
  }

  for (const node of openSet) {
    const cell = cells[node.row * col + node.col];
    cell.classList.add("open");
    updateCostDisplay(cell, node);
  }

  if (startNode) {
    const startCell = cells[startNode.row * col + startNode.col];
    startCell.classList.add("start");
  }
}

function updateCostDisplay(cell, node) {
    // Skip updating cost display for the startNode and endNode
    if (node.row === startNode.row && node.col === startNode.col) {
      return;
    }
  
    if (node.row === endNode.row && node.col === endNode.col) {
      return;
    }
  
    const gDiv = cell.querySelector(".g-cost");
    const hDiv = cell.querySelector(".h-cost");
    const fDiv = cell.querySelector(".f-cost");
  
    if (gDiv) gDiv.textContent = `g: ${node.g.toFixed(0)}`;
    if (hDiv) hDiv.textContent = `h: ${node.h.toFixed(0)}`;
    if (fDiv) fDiv.textContent = `f: ${node.f.toFixed(0)}`;
  }
  
let openSet = [];
let closedSet = new Set();

function runAStar() {
  if (!startNode) {
    alert("Please select a start node.");
    return;
  }

  const start = gridData[startNode.row][startNode.col];
  const end = gridData[endNode.row][endNode.col];

  openSet = [start];
  closedSet = new Set();

  start.g = 0;
  start.h = euclideanHeuristic(startNode, endNode);
  start.f = start.g + start.h;

  stepAStar(gridData, start, end);
}

function runAStarSlow() {
  if (!startNode) {
    alert("Please select a start node.");
    return;
  }

  const start = gridData[startNode.row][startNode.col];
  const end = gridData[endNode.row][endNode.col];

  openSet = [start];
  closedSet = new Set();

  start.g = 0;
  start.h = euclideanHeuristic(startNode, endNode);
  start.f = start.g + start.h;

  stepAStarSlowmotion(gridData, start, end);
}

function stepAStar(grid, startNode, goalNode) {
  if (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f); //Orders the nodes fromt he lowest 'f'-value, if two nodes have same value they are orderes based on their position in the array
      const currentNode = openSet.shift(); //Removes and retrieves the node with lowest 'f'-value

      if (currentNode === goalNode) {
          tracePath(goalNode); 
          updateGridDisplay(openSet, closedSet); 
          return;
      }

      closedSet.add(currentNode); 

      const neighbors = getNeighbors(grid, currentNode);

      for (const neighbor of neighbors) {
          if (closedSet.has(neighbor) || !neighbor.walkable) {
              continue;
          }

          const isDiagonal = (currentNode.row !== neighbor.row) && (currentNode.col !== neighbor.col);
          const moveCost = isDiagonal ? 14 : 10;
          const tentativeG = currentNode.g + moveCost;

          if (!openSet.includes(neighbor)) {
              openSet.push(neighbor);
          } else if (tentativeG >= neighbor.g) {
              continue;
          }

          neighbor.parent = currentNode;
          neighbor.g = tentativeG;
          neighbor.h = euclideanHeuristic(neighbor, goalNode);
          neighbor.f = neighbor.g + neighbor.h;
      }

      updateGridDisplay(openSet, closedSet); 
      setTimeout(() => stepAStar(grid, startNode, goalNode), 0);
  } else {
      updateGridDisplay(openSet, closedSet); 
  }
}


function stepAStarSlowmotion(grid, startNode, goalNode) {
  if (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const currentNode = openSet.shift();

    if (currentNode === goalNode) {
      tracePath(goalNode);
      updateGridDisplay(openSet, closedSet);
      return;
    }

    closedSet.add(currentNode);

    const neighbors = getNeighbors(grid, currentNode);

    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor) || !neighbor.walkable) {
        continue;
      }

      const isDiagonal = (currentNode.row !== neighbor.row) && (currentNode.col !== neighbor.col);
      const moveCost = isDiagonal ? 14 : 10;
      const tentativeG = currentNode.g + moveCost;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (tentativeG >= neighbor.g) {
        continue;
      }

      neighbor.parent = currentNode;
      neighbor.g = tentativeG;
      neighbor.h = euclideanHeuristic(neighbor, goalNode);
      neighbor.f = neighbor.g + neighbor.h;
    }

    updateGridDisplay(openSet, closedSet);
    setTimeout(() => stepAStarSlowmotion(grid, startNode, goalNode), 1000);
  } else {
    updateGridDisplay(openSet, closedSet);
  }
}

function euclideanHeuristic(node, goal) {
  return Math.sqrt((goal.row - node.row) ** 2 + (goal.col - node.col) ** 2) *10;
}


function getNeighbors(grid, node) {
  const neighbors = [];
  const directions = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: -1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: 1, dy: 1 },
  ];

  for (const direction of directions) {
    const nx = node.row + direction.dx;
    const ny = node.col + direction.dy;

    if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length) {
      neighbors.push(grid[nx][ny]);
    }
  }
  return neighbors;
}

function tracePath(goalNode) {
  let currentNode = goalNode;
  
  if (!currentNode.parent && currentNode !== gridData[startNode.row][startNode.col]) {
      alert("No path found!");
      return;
  }

  while (currentNode) {
      const cell = document.querySelector(`.cell[data-row='${currentNode.row}'][data-col='${currentNode.col}']`);
      if (cell) {
          cell.classList.add("path");
      }
      if (currentNode === gridData[startNode.row][startNode.col]) break;
      currentNode = currentNode.parent;
  }
  const startCell = document.querySelector(`.cell[data-row='${startNode.row}'][data-col='${startNode.col}']`);
  if (startCell) {
      startCell.classList.add("start");
  }
  const endCell = document.querySelector(`.cell[data-row='${endNode.row}'][data-col='${endNode.col}']`);
  if (endCell) {
      endCell.classList.add("end");
  }
}

displayGrid(row, col);

document.getElementById("startButton").addEventListener("click", () => {
  runAStar();
});

document.getElementById("startSlowButton").addEventListener("click", () => {
  runAStarSlow();
});

document.getElementById("restart").addEventListener("click", () => {
  startNode = null; // Reset startNode
  openSet = [];
  closedSet.clear();
  gridData = createGrid(row, col, obstacleProbability);
  displayGrid(row, col);
});



