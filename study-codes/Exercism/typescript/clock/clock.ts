export default class Clock {
  constructor(private hours: number, private minutes: number = 0) {
    const date = new Date(2021, 0, 1, this.hours, this.minutes);

    this.hours = date.getHours();
    this.minutes = date.getMinutes();
  }

  public toString = (): string =>
    ("0" + this.hours).slice(-2) + ":" + ("0" + this.minutes).slice(-2);

  public plus = (minutesToAdd: number): string =>
    new Clock(this.hours, this.minutes + minutesToAdd).toString();

  public minus = (minutesToSub: number): string =>
    new Clock(this.hours, this.minutes - minutesToSub).toString();

  public equals = (newClock: Clock): boolean => {
    const currentClock = new Clock(this.hours, this.minutes).toString();

    return `${currentClock}` === `${newClock}` ? true : false;
  };
}
