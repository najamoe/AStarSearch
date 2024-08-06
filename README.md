# A* search algorithm

# A* Algorithm Visualization

## Description

This project visualizes the A* pathfinding algorithm on a 15x15 grid with obstacles. Users can select a starting node, and the algorithm will find the shortest path to a predefined end node using the Euclidean heuristic.

## Features

- **Grid Generation**: Creates a grid of specified dimensions with obstacles.
- **Interactive Interface**: Users can click on a cell to set the starting node.
- **A* Algorithm**: Implements the A* algorithm to find the shortest path from the start node to the end node.
- **Heuristic**: Uses the Euclidean distance as the heuristic to estimate the cost from the current node to the end node.
- **Visualization**: Displays the grid, open set, closed set, and the pathfinding process.
- **Slow Motion Mode**: Allows users to visualize the algorithm's steps in slow motion.

## Use Cases

1. **GPS Navigation**: Finding the shortest path in maps.
2. **Robotics**: Path planning for autonomous robots.
3. **Games**: AI movement in games to find paths.
4. **Logistics**: Optimizing routes in warehouses.

## Implementation Details

### Grid Setup
- **Dimensions**: 15 rows x 15 columns.
- **Obstacles**: Each cell has a 10% probability of being an obstacle.
- **End Node**: Fixed at the top-left corner (0,0).

### Pythagoras Heuristic (Euclidean Distance)
- Calculates the straight-line distance between two points.
- Formula: `sqrt((x2 - x1)^2 + (y2 - y1)^2) * 10`

### Main Components

- **createGrid**: Initializes the grid with obstacles.
- **displayGrid**: Renders the grid in the browser.
- **updateGridDisplay**: Updates the visual representation of the grid.
- **runAStar**: Executes the A* algorithm in real-time.
- **runAStarSlow**: Executes the A* algorithm in slow motion.
- **stepAStar**: Processes one step of the A* algorithm.
- **euclideanHeuristic**: Calculates the Euclidean distance heuristic.
- **getNeighbors**: Retrieves the neighboring cells of a given node.

### Controls

- **Start Button**: Runs the A* algorithm.
- **Start Slow Button**: Runs the A* algorithm in slow motion.
- **Restart Button**: Resets the grid and allows for a new start node selection.

### Cost Calculation
- **g Cost**: The movement cost from the start node to the current node.
- **h Cost**: The estimated cost from the current node to the end node (heuristic).
- **f Cost**: The total cost (f = g + h).

## Getting Started

1. Open the visualization [here](link in a browser.
2. Click on any cell to set it as the starting node.
3. Click "Start" to run the A* algorithm or "Start Slow" to see it step-by-step.
4. Observe the pathfinding process and the final path from the start node to the end node.




