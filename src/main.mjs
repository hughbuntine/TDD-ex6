import Universe from './Universe.mjs';

function main() {
    const universe = new Universe();

    const args = process.argv.slice(2); // Ignore `node` and script name
    if (args.length < 2) {
        console.error("Usage: node main.js <string> <integer>");
        process.exit(1);
    }

    const inputString = args[0];
    const inputNumber = parseInt(args[1], 10);

    if (isNaN(inputNumber)) {
        console.error("Error: Second argument must be an integer.");
        process.exit(1);
    }

    universe.parseRLE(inputString);
    universe.runGenerations(inputNumber);
    universe.writeRLEFile("output.rle");

}

main();

// in the command line put the following command:
// node src/main.mjs "patterns/1beaconpredecessor.rle" 1000

// obviously put however many generations and any patterns you like