import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

import { checkDefaultFiles } from './check-defaults-files.mjs';

const __dirname = path.resolve();
const userConfigurationsFile = path.resolve(__dirname, 'configurations.mjs');

function defaultScriptStop() {
  return process.exit();
}

async function checkYarn() {
  console.log(`▸ Checking yarn.`);

  var yarnDetection = '';

  const shellCommand = spawn('yarn', ['-v'], {
    shell: true,
  });

  shellCommand.stdout.setEncoding('utf8');
  process.stdin.pipe(shellCommand.stdin);

  for await (const data of shellCommand.stdout) {
    yarnDetection = data;
  }

  for await (const data of shellCommand.stderr) {
    console.error(`✖ ERROR!\n` + data);
    defaultScriptStop();
  }

  if (
    isNaN(yarnDetection.split('.').join('')) === false &&
    typeof yarnDetection === 'string' &&
    yarnDetection !== ''
  ) {
    console.log(`✔ Yarn detected ⤏ version: ${yarnDetection}`);
  } else {
    console.log(`⁎ No Yarn installation detected.\n` + `▸ Installing yarn..`);
    await runCommandInTheShell('npm', 'install -g yarn');
  }
}

async function checkConfigurationFile() {
  !fs.existsSync(userConfigurationsFile)
    ? await checkDefaultFiles()
    : console.log('✔ Configurations file detected.');
}

export async function checkerBeforeInstallation() {
  await checkConfigurationFile();
  await checkYarn();
}
