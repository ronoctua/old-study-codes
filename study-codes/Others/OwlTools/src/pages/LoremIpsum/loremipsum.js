import { loremIpsumData } from './data/lorem-ipsum-data.js';
import { beaconIpsumData } from './data/bacon-ipsum-data.js';
import { rickAndMortyIpsum } from './data/rick-and-morty-ipsum.js';
import { mussumPhraseOne, mussumPhrases } from './data/mussum-ipsum-data.js';

const ipsumTextArea = document.querySelector('#ipsum-textarea');
const closeButton = document.querySelector('#close');
const mainIpsumList = document.querySelector('#main-ipsum-list');
const wordOrPhraseLabel = document.querySelector('#word-or-phrase-label');
const numberOfPhrasesOrWords = document.querySelector(
  '#number-of-phrases-or-words',
);
const numberOfParagraphsElement = document.querySelector(
  '#number-of-paragraphs',
);
const paragraphsTagElement = document.querySelector('#paragraphs-tag');
const copyButton = document.querySelector('#copy-button');
const copiedMessageElement = document.querySelector('#copied-message');
const linkButton = document.querySelector('#link-button');

var dataIpsum = loremIpsumData;
var ipsumOne = ['Lorem'];
var ipsumTwo = ['ipsum'];
var endOfParagraph = '.';
var externalLink = 'https://en.wikipedia.org/wiki/Lorem_ipsum';

const ramdomParagraphGenerator = (
  number,
  data,
  ipsumOne,
  ipsumTwo,
  endOfParagraph,
  paragraphsTag,
) => {
  let numberOfItems = data.length;
  let newData = [];
  let ramdomItem = [];

  for (let i = 0; i < number; i++) {
    ramdomItem = [data[Math.floor(Math.random() * numberOfItems)]];

    if (i === 0) {
      ipsumTwo !== null ? (newData = ipsumOne) : (newData = ramdomItem);
    } else if (i === 1) {
      ipsumTwo !== null
        ? (newData = [...newData, ipsumTwo])
        : (newData = [...newData, ramdomItem]);
    } else {
      newData = [...newData, ramdomItem];
    }
  }

  if (paragraphsTag !== '') {
    newData =
      '<' +
      paragraphsTag +
      '>' +
      newData.join(' ') +
      endOfParagraph +
      '</' +
      paragraphsTag +
      '>';

    return newData;
  } else {
    newData = newData.join(' ') + endOfParagraph;

    return newData;
  }
};

const ipsumGenerator = (
  number,
  data,
  ipsumOne,
  ipsumTwo,
  endOfParagraph,
  paragraphsTag,
  numberOfParagraphs,
) => {
  let finalData = [];
  let newParagraph = [];

  for (let i = 0; i < numberOfParagraphs; i++) {
    newParagraph = ramdomParagraphGenerator(
      number,
      data,
      ipsumOne,
      ipsumTwo,
      endOfParagraph,
      paragraphsTag,
    );

    if (i === 0) {
      finalData = [newParagraph];
    } else {
      finalData = [...finalData, newParagraph];
    }
  }

  return finalData.join('\n\n');
};

const handleIpsumContitionsAndStartTheGenerator = () => {
  if (numberOfPhrasesOrWords.value === '0' || !numberOfPhrasesOrWords.value) {
    ipsumTextArea.value = '';
  } else if (
    numberOfPhrasesOrWords.value > 1000 ||
    numberOfParagraphsElement.value > 30
  ) {
    ipsumTextArea.value =
      '⛔✋ ARE YOU CRAZY!!?? ✋⛔ ' +
      'DO YOU WANT TO BREAK YOUR BROWSER!? ' +
      'THE MAXIMUM ALLOWED VALUE IS 1000 WORDS/PHRASES ' +
      'AND 30 PARAGRAPHS!! 😄';
  } else {
    ipsumTextArea.value = ipsumGenerator(
      numberOfPhrasesOrWords.value,
      dataIpsum,
      ipsumOne,
      ipsumTwo,
      endOfParagraph,
      paragraphsTagElement.value,
      numberOfParagraphsElement.value,
    );
  }
};

mainIpsumList.addEventListener('change', async () => {
  if (mainIpsumList.value === 'bacon-ipsum') {
    dataIpsum = beaconIpsumData;
    ipsumOne = ['Bacon'];
    ipsumTwo = ['ipsum'];
    endOfParagraph = '.';
    wordOrPhraseLabel.innerHTML = 'Number of <b>words</b> per paragraph';
    linkButton.textContent = 'Bacon Ipsum Site';
    externalLink = 'https://baconipsum.com/';
  } else if (mainIpsumList.value === 'rick-and-morty-ipsum') {
    dataIpsum = rickAndMortyIpsum;
    ipsumOne = null;
    ipsumTwo = null;
    endOfParagraph = '';
    wordOrPhraseLabel.innerHTML = 'Number of <b>phrases</b> per paragraph';
    linkButton.textContent = 'Rick and Morty Ipsum Site';
    externalLink = 'http://loremricksum.com/';
  } else if (mainIpsumList.value === 'mussum-ipsum') {
    dataIpsum = mussumPhrases;
    ipsumOne = mussumPhraseOne;
    ipsumTwo = null;
    endOfParagraph = '';
    wordOrPhraseLabel.innerHTML = 'Number of <b>phrases</b> per paragraph';
    linkButton.textContent = 'Mussum Ipsum Site';
    externalLink = 'https://mussumipsum.com/';
  } else {
    dataIpsum = loremIpsumData;
    ipsumOne = ['Lorem'];
    ipsumTwo = ['ipsum'];
    endOfParagraph = '.';
    wordOrPhraseLabel.innerHTML = 'Number of <b>words</b> per paragraph';
    linkButton.textContent = 'About Lorem Ipsum';
    externalLink = 'https://en.wikipedia.org/wiki/Lorem_ipsum';
  }

  numberOfPhrasesOrWords.dispatchEvent(new Event('input'));
});

numberOfPhrasesOrWords.addEventListener('input', () => {
  handleIpsumContitionsAndStartTheGenerator();
});

numberOfParagraphsElement.addEventListener('input', () => {
  handleIpsumContitionsAndStartTheGenerator();
});

paragraphsTagElement.addEventListener('input', () => {
  handleIpsumContitionsAndStartTheGenerator();
});

copyButton.addEventListener('click', () => {
  ipsumTextArea.select();
  document.execCommand('copy');
  copiedMessageElement.classList.toggle('hide');

  setTimeout(() => {
    copiedMessageElement.classList.toggle('hide');
  }, 1000);
});

linkButton.addEventListener('click', () => {
  browser.tabs.create({
    url: externalLink,
  });

  close();
});

closeButton.addEventListener('click', () => {
  close();
});
