export default class BinarySearch {
  public array: number[] | undefined;
  public indexLength: number;

  constructor(private targetArray: number[]) {
    this.indexLength = this.targetArray.length - 1;

    const isSorted = this.targetArray.every(
      (number, index) =>
        !index ||
        number <= this.targetArray[index + 1] ||
        index === this.indexLength
    );

    this.array = isSorted ? this.targetArray : undefined;
  }

  public indexOf(target: number, start = 0, end = this.indexLength): number {
    let indexResponse = -1;
    let stopLoop = false;

    while (stopLoop === false) {
      const middle = start + Math.floor((end - start) / 2);
      const elementInTheMiddle = this.targetArray[middle];

      start === middle && end === middle && (stopLoop = true);
      start === middle && end === middle + 1 && (stopLoop = true);
      elementInTheMiddle === target && (stopLoop = true);

      elementInTheMiddle > target && (end = middle);
      elementInTheMiddle < target && (start = middle);

      elementInTheMiddle === target && (indexResponse = middle);
      this.targetArray[end] === target && (indexResponse = end);
    }

    return indexResponse;
  }
}
