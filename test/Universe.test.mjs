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

  test("can add height to top of space", () => {
    universe.addRowToTop();
    expect(universe.space.length).to.equal(6);
  });

  test("new row is filled with false", () => {
    universe.addRowToTop();
    for(let i = 0; i < universe.length; i++) {
      expect(universe.space[0][i]).to.equal(false);
    }
  });

  test("can add height to bottom of space", () => {
    universe.addRowToBottom();
    expect(universe.space.length).to.equal(6);
  });

  test("new row is filled with false", () => {
    universe.addRowToBottom();
    for(let i = 0; i < universe.length; i++) {
      expect(universe.space[5][i]).to.equal(false);
    }
  });
});
