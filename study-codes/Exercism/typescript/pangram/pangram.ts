export default class Pangram {
  constructor(private sentence: string) {}

  isPangram(): boolean {
    let requiredLetters: string[] = [];

    this.sentence
      .toLowerCase()
      .split('')
      .filter((letter) => {
        if (/^[a-z]$/.test(letter) && !requiredLetters.includes(letter)) {
          requiredLetters = [letter, ...requiredLetters];
        }
      });

    return requiredLetters.length === 26;
  }
}
