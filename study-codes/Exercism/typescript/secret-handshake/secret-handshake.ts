export default class SecretHandshake {
  constructor(private userNumber: number) {}

  public commands(): string[] {
    const allCommands = ['wink', 'double blink', 'close your eyes', 'jump'];

    const bitChecker = (bit: number): number => this.userNumber & (1 << bit);

    const commands = allCommands.filter((_, index) => bitChecker(index));

    return bitChecker(4) ? commands.reverse() : commands;
  }
}
