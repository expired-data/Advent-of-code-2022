export const solvePart1 = (input: string): number => {
  const forest: number[][] = parseForest(input);
  const visibleRows: boolean[][] = forest.map((row: number[]): boolean[] => {
    const leftVisibility = leftVisible(row);
    const rightVisiblity = leftVisible([...row].reverse()).reverse();

    return leftVisibility.map(
      (isVisible: boolean, index: number): boolean =>
        isVisible || rightVisiblity[index]
    );
  });

  const columns: number[][] = forest[0].map((tree: number, index: number) =>
    forest.flatMap((row: number[]) =>
      row.filter((tree: number, i: number): boolean => i === index)
    )
  );
  const visibleColumns: boolean[][] = columns.map(
    (column: number[]): boolean[] => {
      const leftVisibility = leftVisible(column);
      const rightVisiblity = leftVisible([...column].reverse()).reverse();

      return leftVisibility.map(
        (isVisible: boolean, index: number): boolean =>
          isVisible || rightVisiblity[index]
      );
    }
  );

  const visibleAtAll: boolean[][] = visibleRows.map(
    (row: boolean[], i: number): boolean[] =>
      row.map((val: boolean, j: number): boolean => visibleColumns[j][i] || val)
  );
  return visibleAtAll.flatMap((row: boolean[]): boolean[] =>
    row.filter((visible: boolean): boolean => visible)
  ).length;
};

export const parseForest = (input: string): number[][] => {
  const rows = input.split(/\r?\n/);
  return rows.map((row) =>
    row.split("").map((strVal: string): number => parseInt(strVal))
  );
};

export const leftVisible = (row: number[]): boolean[] => {
  return row.map((height, index): boolean =>
    row.every((tree, i): boolean => tree < height || i >= index)
  );
};

export const solvePart2 = (input: string): number => {
  const forest = parseForest(input);
  const visibilities = forest.flatMap((row: number[], i: number): number[] =>
    row.map((tree: number, j: number): number => {
      let leftCount = 0;
      for (let leftJ = j - 1; leftJ >= 0; leftJ--) {
        leftCount++;
        if (row[leftJ] >= tree) {
          break;
        }
      }
      let rightCount = 0;
      for (let rightJ = j + 1; rightJ < row.length; rightJ++) {
        rightCount++;
        if (row[rightJ] >= tree) break;
      }
      let topCount = 0;
      for (let topI = i - 1; topI >= 0; topI--) {
        topCount++;
        if (forest[topI][j] >= tree) break;
      }
      let bottomCount = 0;
      for (let bottomI = i + 1; bottomI < forest.length; bottomI++) {
        bottomCount++;
        if (forest[bottomI][j] >= tree) break;
      }
      
      return leftCount * rightCount * topCount * bottomCount;
    })
  );

  return visibilities.sort((a, b) => b - a)[0];
};
