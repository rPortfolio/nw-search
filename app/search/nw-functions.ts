const match = 1;
const mismatch = -1;
const indel = -1;

export function generateGrid(qry: string, sub: string): number[][] {
  let grid: number[][] = [];
  return processGrid(grid, qry, sub, 0);
}

function processGrid(
  grid: number[][],
  qry: string,
  sub: string,
  row: number
): number[][] {
  if (row > sub.length) {
    return grid;
  }
  grid.push(processRow(grid, [], qry, sub, 0));
  return processGrid(grid, qry, sub, row + 1);
}

function processRow(
  grid: number[][],
  newRow: number[],
  qry: string,
  sub: string,
  e: number
): number[] {
  if (newRow.length > qry.length) {
    return newRow;
  }
  if (grid.length == 0) {
    newRow.push(e * indel);
  } else if (e == 0) {
    newRow.push(grid.length * indel);
  } else {
    let top: number = grid[grid.length - 1][e] + indel;
    let left: number = grid[grid.length - 1][e - 1] + indel;
    let mod: number = sub[grid.length - 1] == qry[e - 1] ? match : mismatch;
    let diag: number = grid[grid.length - 1][e - 1] + mod;
    let max: number = Math.max(top, left, diag);
    newRow.push(max);
  }
  return processRow(grid, newRow, qry, sub, e + 1);
}

export function traceback(
  grid: number[][],
  coords: number[][],
  qry: string,
  sub: string
): Array<Array<number>> {
  if (coords.length == 0) {
    coords.push(getLargestCoords(grid));
    return traceback(grid, coords, qry, sub);
  }

  if (coords[coords.length - 1][0] == 0 || coords[coords.length - 1][1] == 0) {
    coords.pop();
    return coords;
  }

  let prevCoords = coords[coords.length - 1];
  if (sub[prevCoords[0] - 2] == qry[prevCoords[1] - 2]) {
    coords.push([prevCoords[0] - 1, prevCoords[1] - 1]);
    return traceback(grid, coords, qry, sub);
  }

  if (
    grid[prevCoords[0] - 1][prevCoords[1]] >
    grid[prevCoords[0]][prevCoords[1] - 1]
  ) {
    coords.push([prevCoords[0] - 1, prevCoords[1]]);
  } else {
    coords.push([prevCoords[0], prevCoords[1] - 1]);
  }
  return traceback(grid, coords, qry, sub);
}

export function getLargestCoords(grid: number[][]): number[] {
  return processRowCoords(grid, [0, 0], 0);
}

function processRowCoords(
  grid: number[][],
  coords: number[],
  row: number
): number[] {
  if (row == grid.length) {
    return coords;
  }
  let largestCol = getLargestCol(grid[row], 0, 0);
  if (grid[row][largestCol] >= grid[coords[0]][coords[1]]) {
    return processRowCoords(grid, [row, largestCol], row + 1);
  }
  return processRowCoords(grid, coords, row + 1);
}

function getLargestCol(row: number[], coord: number, i: number): number {
  if (i == row.length) {
    return coord;
  }
  if (row[i] >= row[coord]) {
    return getLargestCol(row, i, i + 1);
  } else {
    return getLargestCol(row, coord, i + 1);
  }
}

export function printTraceback(
  tb: number[][],
  qry: string,
  sub: string,
  qryRes: string,
  subRes: string,
  prev: number[]
) {
  let coords = tb.pop();
  if (!coords) {
    console.log(qryRes);
    console.log(subRes);
    return;
  }
  if (qry[coords[1] - 1] == sub[coords[0] - 1]) {
    qryRes += qry[coords[1] - 1];
    subRes += sub[coords[0] - 1];
  } else {
    if (!prev) {
      qryRes += '-';
      subRes += '-';
    } else {
      if (prev[0] == coords[0]) {
        qryRes += '-';
        subRes += sub[coords[0] - 1];
      } else {
        subRes += '-';
        qryRes += qry[coords[1] - 1];
      }
    }
  }
  if (tb.length >= 2) {
    if (
      tb[tb.length - 2][0] == coords[0] + 1 &&
      tb[tb.length - 2][1] == coords[1] + 1
    ) {
      tb.pop();
    }
  }

  printTraceback(tb, qry, sub, qryRes, subRes, coords);
}
