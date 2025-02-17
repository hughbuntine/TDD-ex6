export default class Universe {
    length;
    height;
    space;
    nextSpace;

    constructor(length, height) {
        // Create a 2D array
        this.space = new Array(height);
        for (let i = 0; i < length; i++) {
            this.space[i] = new Array(length);
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
        for (let i = 0; i < this.length; i++) {
            this.nextSpace[i] = new Array(this.length);
        }

        // Initialize all cells to false
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.height; j++) {
                this.nextSpace[i][j] = false;
            }
        }
    }

    addRowToTop() {
        this.space.unshift(new Array(this.length).fill(false));
    }

    addRowToBottom() {
        this.space.push(new Array(this.length).fill(false));
    }


    
}