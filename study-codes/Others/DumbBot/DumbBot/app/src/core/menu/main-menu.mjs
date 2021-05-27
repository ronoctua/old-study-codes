import { menuCreator } from './menu-creator.mjs';

import { runDevMode } from '../run-dev-mode.mjs';
import { addModule } from '../modules/add-module.mjs';
import { removeModule } from '../modules/remove-module.mjs';
import { createModule } from '../modules/create-module.mjs';

function defaultScriptStop() {
  return process.exit();
}

const menuArray = [
  {
    name: 'Run DumbBot (dev mode)',
    action: () => runDevMode(),
    closeMenu: true,
  },
  {
    name: 'Add module',
    action: () => addModule(),
    closeMenu: true,
  },
  {
    name: 'Remove module',
    action: () => removeModule(),
    closeMenu: false,
  },
  {
    name: `Create module`,
    action: () => createModule(),
    closeMenu: true,
  },
  {
    name: 'Exit',
    action: () => console.log('\nGoodbye My Friend! 🖐\n'),
    closeMenu: true,
  },
];

export async function mainMenu() {
  try {
    await menuCreator(menuArray, 'What do you want to do?');
  } catch (err) {
    console.error(`✖ ERROR ⤏ Could not creat the Main Menu.\n\n${err}\n`);
    defaultScriptStop();
  }
}
