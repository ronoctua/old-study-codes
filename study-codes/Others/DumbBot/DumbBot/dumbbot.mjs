console.clear();
console.log(`✔ DumbBot launcher`);

import { checkerBeforeInstallation } from './app/src/core/checks/checker-before-installation.mjs';
import { checkerAfterInstallation } from './app/src/core/checks/checker-after-installation.mjs';
import { installDumbBot } from './app/src/core/install.mjs';
import { mainMenu } from './app/src/core/menu/main-menu.mjs';

export async function startDumbBot() {
  try {
    await checkerBeforeInstallation();
    await installDumbBot();
    await checkerAfterInstallation();
    await mainMenu();
  } catch (err) {
    console.error(err);
  }
}

startDumbBot();
