export default class Universe {
    length;
    height;
    space;
    nextSpace;

    constructor(length, height) {
        this.length = length;
        this.height = height;

        // Create and initialize a 2D array
        this.space = new Array(height).fill(null).map(() => new Array(length).fill(false));
    }

    setTrue(x, y) {
        this.space[y][x] = true;
    }

    setFalse(x, y) {
        this.space[y][x] = false;
    }

    get(x, y) {
        return this.space[y][x];
    }

    createNextSpace() {
        // Create the next generation grid with the correct dimensions
        this.nextSpace = new Array(this.height).fill(null).map(() => new Array(this.length).fill(false));
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

    addSpaces() {
        let addToTop = false;
        let addToBottom = false;
        let addToLeft = false;
        let addToRight = false;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.length; x++) {
                if (this.space[y][x]) {
                    if (y === 0) addToTop = true;
                    if (y === this.height - 1) addToBottom = true;
                    if (x === 0) addToLeft = true;
                    if (x === this.length - 1) addToRight = true;
                }
            }
        }

        if (addToTop) this.addRowToTop();
        if (addToBottom) this.addRowToBottom();
        if (addToLeft) this.addColumnToLeft();
        if (addToRight) this.addColumnToRight();
    }

    tick() {
        this.createNextSpace();

        // Update each cell in the next generation
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.length; x++) {
                this.updateCellNextGen(x, y);
            }
        }

        // Update the current space
        this.space = JSON.parse(JSON.stringify(this.nextSpace));
        this.nextSpace = null;

        // Expand after computing next generation
        this.addSpaces();
    }

    print() {
        let toBePrinted = "";
        for (let y = 0; y < this.height; y++) {
            let row = "";
            for (let x = 0; x < this.length; x++) {
                row += this.space[y][x] ? "X" : ".";
            }
            toBePrinted += row + "\n";
        }
        return toBePrinted;
    }

    updateCellNextGen(x, y) {
        let aliveNeighbours = 0;

        // Get alive neighbours
        for (let i = y - 1; i <= y + 1; i++) {
            for (let j = x - 1; j <= x + 1; j++) {
                if (
                    i >= 0 &&
                    i < this.height &&
                    j >= 0 &&
                    j < this.length &&
                    (i !== y || j !== x)
                ) {
                    if (this.space[i][j]) {
                        aliveNeighbours++;
                    }
                }
            }
        }

        // Apply Game of Life rules
        if (this.space[y][x]) {
            this.nextSpace[y][x] = aliveNeighbours === 2 || aliveNeighbours === 3;
        } else {
            this.nextSpace[y][x] = aliveNeighbours === 3;
        }
    }
}
