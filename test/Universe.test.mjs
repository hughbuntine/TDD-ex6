import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import Universe from "../src/Universe.mjs";

describe("5x5 Universe", () => {
  let universe;
  beforeEach(() => {
    universe = new Universe(5, 5);
  })

  test("is a class", () => {
    expect(Universe).to.be.a("function");
  });

  test("is a a 2D array", () => {
    expect(universe.space).to.be.an("array");
    expect(universe.space[0]).to.be.an("array");
  });

  test("has a length and height", () => {
    expect(universe.space.length).to.equal(5);
    expect(universe.space[0].length).to.equal(5);
  });

  test("each cell starts false", () => {
    for(let i = 0; i < universe.length; i++) {
      for(let j = 0; j < universe.height; j++) {
        expect(universe.space[i][j]).to.equal(false);
      }
    }
  });

  test("can set a cell to true", () => {
    universe.setTrue(0, 0);
    expect(universe.space[0][0]).to.equal(true);
  });

  test("can set a cell to false", () => {
    universe.setTrue(0, 0);
    universe.setFalse(0, 0);
    expect(universe.space[0][0]).to.equal(false);
  });

  test("can make a space for the next generation", () => {
    universe.createNextSpace();
    expect(universe.nextSpace.length).to.equal(universe.space.length);
    expect(universe.nextSpace.height).to.equal(universe.space.height);
  });

  test("can add row to top of space", () => {
    universe.addRowToTop();
    expect(universe.space.length).to.equal(6);
    expect(universe.height).to.equal(6);
  });

  test("new row is filled with false", () => {
    universe.addRowToTop();
    for(let i = 0; i < universe.length; i++) {
      expect(universe.space[0][i]).to.equal(false);
    }
  });

  test("can add row to bottom of space", () => {
    universe.addRowToBottom();
    expect(universe.height).to.equal(6);
  });

  test("new row is filled with false", () => {
    universe.addRowToBottom();
    for(let i = 0; i < universe.length; i++) {
      expect(universe.space[5][i]).to.equal(false);
    }
  });

  test("can add column to left of space", () => {
    universe.addColumnToLeft();
    expect(universe.space[0].length).to.equal(6);
    expect(universe.length).to.equal(6);
  });

  test("new column is filled with false", () => {
    universe.addColumnToLeft();
    for(let i = 0; i < universe.height; i++) {
      expect(universe.space[i][0]).to.equal(false);
    }
  });

  test("can add column to right of space", () => {
    universe.addColumnToRight();
    expect(universe.length).to.equal(6);
  });

  test("new column is filled with false", () => {
    universe.addColumnToRight();
    for(let i = 0; i < universe.height; i++) {
      expect(universe.space[i][5]).to.equal(false);
    }
  });

  test("tick makes space bigger if needed (height)", () => {
    universe.setTrue(1, 0);
    universe.setTrue(2, 0);
    universe.setTrue(3, 0);
    universe.tick();
    expect(universe.length).to.equal(5);
    expect(universe.height).to.equal(6);
  });

  test("tick makes space bigger if needed (length)", () => {
    universe.setTrue(0, 1);
    universe.setTrue(0, 2);
    universe.setTrue(0, 3);
    universe.tick();
    expect(universe.length).to.equal(6);
    expect(universe.height).to.equal(5);
  });

  test("print prints the space", () => {
    universe.setTrue(0, 0);
    universe.setTrue(1, 1);
    universe.setTrue(2, 2);
    universe.setTrue(3, 3);
    universe.setTrue(4, 4);
    const expected = "X....\n.X...\n..X..\n...X.\n....X\n";
    expect(universe.print()).to.equal(expected);
  });

  test("single cell dies after tick", () => {
    universe.setTrue(2, 2);
    universe.tick();
    expect(universe.space[2][2]).to.equal(false);
  });

  test("block", () => {
    universe.setTrue(1, 1);
    universe.setTrue(1, 2);
    universe.setTrue(2, 1);
    universe.setTrue(2, 2);
    universe.tick();
    expect(universe.space[1][1]).to.equal(true);
    expect(universe.space[1][2]).to.equal(true);
    expect(universe.space[2][1]).to.equal(true);
    expect(universe.space[2][2]).to.equal(true);
  });

  test("blinker", () => {
    universe.setTrue(1, 2);
    universe.setTrue(2, 2);
    universe.setTrue(3, 2);
    universe.tick();
    universe.tick();
    expect(universe.get(1, 2)).to.equal(true);
    expect(universe.get(2, 2)).to.equal(true);
    expect(universe.get(3, 2)).to.equal(true);
  });

  test("toad", () => {
    universe.setTrue(1, 2);
    universe.setTrue(2, 2);
    universe.setTrue(3, 2);
    universe.setTrue(2, 3);
    universe.setTrue(3, 3);
    universe.setTrue(4, 3);
    universe.tick();
    universe.tick();
    expect(universe.get(1, 2)).to.equal(true);
    expect(universe.get(2, 2)).to.equal(true);
    expect(universe.get(3, 2)).to.equal(true);
    expect(universe.get(2, 3)).to.equal(true);
    expect(universe.get(3, 3)).to.equal(true);
    expect(universe.get(4, 3)).to.equal(true);
  });


  
});
