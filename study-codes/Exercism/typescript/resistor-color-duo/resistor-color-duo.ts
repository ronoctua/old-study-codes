const colorsValues = {
  black: '0',
  brown: '1',
  red: '2',
  orange: '3',
  yellow: '4',
  green: '5',
  blue: '6',
  violet: '7',
  grey: '8',
  white: '9',
};

type Colors = keyof typeof colorsValues;

export class ResistorColor {
  constructor(private colors: Colors[]) {
    if (this.colors.length < 2) {
      throw new Error('At least two colors need to be present');
    }
  }

  value = (): number => {
    return Number(colorsValues[this.colors[0]] + colorsValues[this.colors[1]]);
  };
}
