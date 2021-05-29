const createStringWithNumbers = (): string =>
  ('000' + `${Math.floor(Math.random() * 999)}`).slice(-3);

const createLetter = (): string =>
  String.fromCharCode(Math.round(Math.random() * 26 + 65));

const allCreatedNames: Set<string> = new Set();

const createName = (): string => {
  const newName = createLetter() + createLetter() + createStringWithNumbers();

  if (allCreatedNames.has(newName)) return createName();

  allCreatedNames.add(newName);

  return newName;
};

export default class Robot {
  public robotName: string;

  constructor() {
    this.robotName = createName();
  }

  public get name(): string {
    return this.robotName;
  }

  public resetName = (): string => (this.robotName = createName());

  public static releaseNames = (): void => allCreatedNames.clear();
}
