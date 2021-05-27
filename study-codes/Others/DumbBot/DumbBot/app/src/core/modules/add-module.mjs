import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

import consoleRW from 'console-read-write';
import stringifyObject from 'stringify-object';

import { startDumbBot } from '../../../../dumbbot.mjs';

const __dirname = path.resolve();

const userConfigurationsFile = path.resolve(__dirname, 'configurations.mjs');

var moduleDefaultConfigurations = '';

const modulesDirectory = path.resolve(__dirname, 'app', 'src', 'modules');

function defaultScriptStop() {
  return process.exit();
}

async function checkRepository(repository) {
  console.log(`▸ Checking repository.`);

  const checkRepoShellCommand = spawn(
    'git',
    [`ls-remote --exit-code -h ${repository}`],
    {
      shell: true,
    },
  );

  checkRepoShellCommand.stdout.setEncoding('utf8');
  process.stdin.pipe(checkRepoShellCommand.stdin);

  for await (const data of checkRepoShellCommand.stdout) {
    console.log('✔ Repository exists.');
  }

  for await (const data of checkRepoShellCommand.stderr) {
    console.log(
      `✖ ERROR ⤏ This repository probably doesn't exist: ${repository}\n\n`,
    );
    defaultScriptStop();
  }
}

async function runCommandInTheShell(command, parameter) {
  console.log(`✔ Running: ${command} ${parameter}`);

  const shellCommand = spawn(command, [parameter], {
    shell: true,
  });

  shellCommand.stdout.setEncoding('utf8');
  process.stdin.pipe(shellCommand.stdin);

  for await (const data of shellCommand.stdout) {
    console.log(data);
  }
}

async function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function cloneRepositoryModule() {
  try {
    console.log('Enter the url of the module repository to be cloned:');

    let moduleUrl = await consoleRW.read().then(async (answer) => {
      return answer;
    });

    let moduleName = moduleUrl.split('/').pop();

    if (moduleName.substr(moduleName.length - 4) === '.git') {
      moduleName = moduleName.slice(0, -4);
    } else {
      moduleUrl = moduleUrl + '.git';
    }

    await checkRepository(moduleUrl);

    moduleDefaultConfigurations = path.resolve(
      __dirname,
      'app',
      'src',
      'modules',
      moduleName,
      'default-config.js',
    );

    await runCommandInTheShell(
      'cd',
      `${modulesDirectory} && git clone ${moduleUrl}`,
    );

    console.log('✔ Cloning process completed.');
  } catch (err) {
    console.error(`✖ ERROR!\n\n${err}\n`);
    defaultScriptStop();
  }
}

async function createUserConfigurationContent(moduleConfigurations) {
  try {
    let defaultConfig = {};

    if (fs.existsSync(moduleConfigurations)) {
      await import(moduleConfigurations).then((defaultConfiguration) => {
        defaultConfig = defaultConfiguration.defaultConfig;
      });
    }

    let preferences = {};
    let styles = {};
    let modules = [];

    if (fs.existsSync(userConfigurationsFile)) {
      await import('../../../../configurations.mjs').then((modulesArray) => {
        preferences = modulesArray.preferences;
        styles = modulesArray.styles;
        modules = modulesArray.modules;
      });
    }

    modules = [...modules, defaultConfig];

    let newUserConfigurationsContent = `export const preferences = ${stringifyObject(
      preferences,
    )};

export const styles = ${stringifyObject(styles)};

export const modules = ${stringifyObject(modules)};

// Containers schematic:
//  top-left     ┋ top-center    ┋ top-right
// ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
//  middle-left  ┋ middle-center ┋ middle-right
// ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
//  bottom-left  ┋ bottom-center ┋ bottom-right
`;

    return newUserConfigurationsContent;
  } catch (err) {
    console.error(
      `✖ ERROR ⤏ The configurations for this module could not be imported. Try to do this manually.\n\n${err}\n`,
    );
    defaultScriptStop();
  }
}

async function createFile(file, fileContent) {
  fs.writeFile(file, fileContent, function (err) {
    if (err) {
      console.error(`✖ ERROR ⤏ Could not create the file: ${file}\n\n${err}\n`);
      defaultScriptStop();
    }
  });
}

export async function addModule() {
  try {
    console.log(`\n\n\n\n▸ Add module.\n`);

    await cloneRepositoryModule();

    let newUserConfigurationContent = await createUserConfigurationContent(
      moduleDefaultConfigurations,
    );

    await createFile(userConfigurationsFile, newUserConfigurationContent);

    console.log(`✔ Module configurations imported.\nDone.\n\n`);
    await sleep(2000);

    await startDumbBot();
  } catch (err) {
    console.error(`✖ ERROR!\n\n${err}\n`);
    defaultScriptStop();
  }
}
