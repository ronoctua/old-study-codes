import fs from 'fs';
import path from 'path';

import consoleRW from 'console-read-write';

const __dirname = path.resolve();

function defaultScriptStop() {
  return process.exit();
}

async function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function messageWithSleep(milliseconds, message) {
  console.log(message);
  await sleep(milliseconds);
}

function isOdd(number) {
  return number % 2;
}

const dumbBotAsciiArt = `
 ╔╦╗┬ ┬┌┬┐┌┐ ╔╗ ┌─┐┌┬┐
  ║║│ ││││├┴┐╠╩╗│ │ │
 ═╩╝└─┘┴ ┴└─┘╚═╝└─┘ ┴
`;

var closeMenu = false;

function menuListCreator(menuItensArray) {
  let maxCharactersOfEvenItens = 0;
  let menuList = ``;

  menuItensArray.forEach((item) => {
    let itemIndex = menuItensArray.indexOf(item);

    if (isOdd(itemIndex) == 0) {
      let numberOfCharacteres = item.name.length;
      if (numberOfCharacteres > maxCharactersOfEvenItens) {
        maxCharactersOfEvenItens = numberOfCharacteres;
      }
    }
  });

  menuItensArray.forEach((item) => {
    let itemIndex = menuItensArray.indexOf(item);

    if (isOdd(itemIndex) == 0) {
      let numberOfCharacteres = item.name.length;
      let spacesNumber = maxCharactersOfEvenItens - numberOfCharacteres + 3;
      let spaces = ' '.repeat(spacesNumber);

      menuList = `${menuList} ${itemIndex + 1} ⤏ ${item.name}${spaces}`;
    } else {
      menuList = `${menuList} ${itemIndex + 1} ⤏ ${item.name}\n`;
    }
  });

  return menuList;
}

export async function menuCreator(menuArray, headerMessage) {
  try {
    await sleep(1000); // ⇠ necessary to not capture some previous console signal

    async function conditionsReader(answer, array) {
      const arrayItem = array[answer - 1];

      if (typeof arrayItem === 'undefined') {
        await messageWithSleep(2000, `  🖢  WRONG ANSWER!!!`);
      } else {
        arrayItem.closeMenu === true && (closeMenu = true);
        await arrayItem.action();
      }
    }

    while (true) {
      console.log(
        `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n` +
          `${dumbBotAsciiArt}` +
          `${headerMessage}` +
          `\n${menuListCreator(menuArray)}\n` +
          `Type a number and press enter! `,
      );

      await consoleRW.read().then(async (answer) => {
        await conditionsReader(answer, menuArray);
        await sleep(800);
      });

      if (closeMenu === true) break;
    }
  } catch (err) {
    console.error(`✖ ERROR!\n\n${err}\n`);
    defaultScriptStop();
  }
}
