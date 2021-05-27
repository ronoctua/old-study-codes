import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

import { createModulesComponentsListFile } from './modules/module-page-generator.mjs';

const __dirname = path.resolve();
const appFolder = path.resolve(__dirname, 'app');
const configurationsFile = path.resolve(
  __dirname,
  'app',
  'src',
  'temp',
  'configurations.mjs',
);
const userConfigurationsFile = path.resolve(__dirname, 'configurations.mjs');

function defaultScriptStop() {
  return process.exit();
}

async function copyFile(sourcePathAndFileName, destinationPathAndFileName) {
  try {
    fs.copyFileSync(sourcePathAndFileName, destinationPathAndFileName);
    console.log(
      `✔ Copied: ${sourcePathAndFileName} to ⤏ ${destinationPathAndFileName}`,
    );
  } catch (err) {
    console.error(
      `✖ ERROR ⤏ Could not copy: ${sourcePathAndFileName} to ⤏ ${destinationPathAndFileName}\n\n${err}\n`,
    );
    defaultScriptStop();
  }
}

async function install() {
  console.log(`▸ Running: yarn --cwd ${appFolder}`);

  const yarnCommand = spawn('yarn', [`--cwd ${appFolder}`], {
    shell: true,
  });

  yarnCommand.stdout.setEncoding('utf8');
  process.stdin.pipe(yarnCommand.stdin);

  for await (const data of yarnCommand.stdout) {
    console.log(data);
  }
}

export async function installDumbBot() {
  await copyFile(userConfigurationsFile, configurationsFile);
  await createModulesComponentsListFile();
  await install();
}
