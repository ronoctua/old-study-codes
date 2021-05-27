export default class Bob {
  hey(userSentence: string): string {
    userSentence = userSentence.trim();

    const testEmptySentence = userSentence === '';
    const testHasUppercase = /[A-Z]/.test(userSentence);
    const testHasLowercase = /[a-z]/.test(userSentence);
    const testQuestion = userSentence.slice(-1) === '?';
    const testYellingSentence = testHasUppercase && !testHasLowercase;
    const testYellingQuestion = testYellingSentence && testQuestion;

    if (testEmptySentence) return 'Fine. Be that way!';
    if (testYellingQuestion) return "Calm down, I know what I'm doing!";
    if (testYellingSentence) return 'Whoa, chill out!';
    if (testQuestion) return 'Sure.';

    return 'Whatever.';
  }
}
