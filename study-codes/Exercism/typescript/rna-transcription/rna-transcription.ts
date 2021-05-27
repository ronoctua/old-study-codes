const nucleotideReplacements: { [key: string]: string } = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

class Transcriptor {
  toRna(dnaNucleotides: string): string {
    const rnaNucleotides = dnaNucleotides
      .split('')
      .map((nucleotide) => {
        if (!nucleotideReplacements[nucleotide]) {
          throw new Error('Invalid input DNA.');
        }

        return nucleotideReplacements[nucleotide];
      })
      .join('');

    return rnaNucleotides;
  }
}

export default Transcriptor;
