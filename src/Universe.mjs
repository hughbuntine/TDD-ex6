export default class Universe {
    length;
    height;
    space;
    nextSpace;

    constructor(length, height) {
        // Create a 2D array
        this.space = new Array(length);
        for (let i = 0; i < length; i++) {
            this.space[i] = new Array(height);
        }

        this.length = length;
        this.height = height;

        // Initialize all cells to false
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < height; j++) {
                this.space[i][j] = false;
            }
        }
    }

    setTrue(x, y) {
        this.space[x][y] = true;
    }

    setFalse(x, y) {
        this.space[x][y] = false;
    }

    createNextSpace() {
        // Create a 2D array
        this.nextSpace = new Array(this.height);
        for (let i = 0; i < this.height; i++) {
            this.nextSpace[i] = new Array(this.length);
        }

        // Initialize all cells to false
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.length; j++) {
                this.nextSpace[i][j] = false;
            }
        }
    }

    addRowToTop() {
        this.space.unshift(new Array(this.length).fill(false));
        this.height++;
    }

    addRowToBottom() {
        this.space.push(new Array(this.length).fill(false));
        this.height++;
    }

    addColumnToLeft() {
        for (let i = 0; i < this.height; i++) {
            this.space[i].unshift(false);
        }
        this.length++;
    }

    addColumnToRight() {
        for (let i = 0; i < this.height; i++) {
            this.space[i].push(false);
        }
        this.length++;
    }

    addSpaces(){
            let addToTop = false;
            let addToBottom = false;
            let addToLeft = false;  
            let addToRight = false;

            for (let i = 0; i < this.length; i++) {
                for (let j = 0; j < this.height; j++) {
                    if (this.space[i][j] == true) {
                        if (i == 0) {
                            addToTop = true;
                        }
                        if (i == this.length - 1) {
                            addToBottom = true;
                        }
                        if (j == 0) {
                            addToLeft = true;
                        }
                        if (j == this.height - 1) {
                            addToRight = true;
                        }
                    }
                }
            }

            if (addToTop) {
                this.addRowToTop();
            }
            if (addToBottom) {
                this.addRowToBottom();
            }
            if (addToLeft) {
                this.addColumnToLeft();
            }
            if (addToRight) {
                this.addColumnToRight();
            }
    }
    
    tick(){
        this.addSpaces();
        this.createNextSpace(); // create the space for the next generation

        // Update each cell in the next generation
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.length; j++) {
                this.updateCellNextGen(i, j);
            }
        }

        // Update the current space
        this.space = JSON.parse(JSON.stringify(this.nextSpace));
        this.nextSpace = null;
    }
    
    print(){
        let toBePrinted = "";
        for (let i = 0; i < this.length; i++) {
            let row = "";
            for (let j = 0; j < this.height; j++) {
                row += this.space[i][j] ? "X" : ".";
            }
            toBePrinted += row + "\n";
        }
        return toBePrinted;
    }

    updateCellNextGen(x, y){
        let aliveNeighbours = 0;

        // Get alive neighbours
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i >= 0 && i < this.height && j >= 0 && j < this.length && (i != x || j != y)) {
                    if (this.space[i][j]) {
                        aliveNeighbours++;
                    }
                }
            }
        }

        // Update cell
        if (this.space[x][y]) { // if alive
            if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                this.nextSpace[x][y] = false;
            } else {
                this.nextSpace[x][y] = true;
            }
        } else { // if dead
            if (aliveNeighbours == 3) {
                this.nextSpace[x][y] = true;
            } else {
                this.nextSpace[x][y] = false;
            }
        }
    }
 
}