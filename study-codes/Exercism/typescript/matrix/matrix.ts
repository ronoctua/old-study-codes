export default class Matrix {
  public rows: number[][];
  public columns: number[][] = [];

  constructor(userMatrix: string) {
    this.rows = userMatrix
      .split('\n')
      .map((matrixRow) => matrixRow.split(' ').map(Number));

    this.rows.map((_, index) => {
      let newRowContent: number[] = [];

      this.rows.map((matrixRow) => {
        newRowContent = [...newRowContent, matrixRow[index]];
      });

      this.columns = [...this.columns, newRowContent];
    });
  }
}
