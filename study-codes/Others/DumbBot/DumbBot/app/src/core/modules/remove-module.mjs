import fs from 'fs';
import path from 'path';

import consoleRW from 'console-read-write';
import stringifyObject from 'stringify-object';

const __dirname = path.resolve();

const userConfigurationsFile = path.resolve(__dirname, 'configurations.mjs');

function defaultScriptStop() {
  return process.exit();
}

async function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function createFile(file, fileContent) {
  fs.writeFile(file, fileContent, function (err) {
    if (err) {
      console.error(`✖ ERROR ⤏ Could not create the file: ${file}\n\n${err}\n`);
      defaultScriptStop();
    }
  });
}

async function removeDirectory(targetDirectory) {
  try {
    fs.rmdir(targetDirectory, { recursive: true }, (err) => {
      console.error(err);
    });
  } catch (err) {
    console.error(`\n✖ ERROR ⤏ Could not delete: ${targetDirectory}\n\n`);
    defaultScriptStop();
  }
}

async function showModulesList(modulesArray) {
  try {
    let num = 0;

    modulesArray.forEach((module) => {
      num = num + 1;
      console.log(num + ' ⤏ ' + module.name);
    });
  } catch (err) {
    console.error(
      `✖ ERROR ⤏ Could not get the module array from the configuration file.\n\n${err}\n`,
    );
    defaultScriptStop();
  }
}

async function removeModuleFolder(targetAnswer, modulesArray) {
  try {
    const targetName = modulesArray[targetAnswer - 1].name;

    const moduleFolder = path.resolve(
      __dirname,
      'app',
      'src',
      'modules',
      targetName,
    );

    removeDirectory(moduleFolder);
    console.log(`\n✔ Module folder removed.`);
  } catch (err) {
    console.error(`✖ ERROR ⤏ Could not remove module folder.\n\n${err}\n`);
    defaultScriptStop();
  }
}

async function createNewConfigurationContent(
  targetAnswer,
  configurationsContent,
) {
  try {
    const modulesArray = configurationsContent.modules;
    const newModulesArray = modulesArray.filter((moduleElement) => {
      return moduleElement !== modulesArray[targetAnswer - 1];
    });

    const newUserConfigurationsContent = `export const preferences = ${stringifyObject(
      configurationsContent.preferences,
    )};

export const styles = ${stringifyObject(configurationsContent.styles)};

export const modules = ${stringifyObject(newModulesArray)};

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
      `✖ ERROR ⤏ Could not rebuilt configuration file.\n\n${err}\n`,
    );
    defaultScriptStop();
  }
}

export async function removeModule() {
  try {
    let userConfigurationsContent = {};
    let modulesList = [];

    if (fs.existsSync(userConfigurationsFile)) {
      await import('../../../../configurations.mjs').then((modulesArray) => {
        userConfigurationsContent = modulesArray;
        modulesList = modulesArray.modules;
      });
    }

    console.log('\nWhich module do you want to remove?');
    await showModulesList(modulesList);
    console.log('Type a number and press enter!');

    await consoleRW.read().then(async (answer) => {
      await removeModuleFolder(answer, modulesList);
      let newConfigurationContent = await createNewConfigurationContent(
        answer,
        userConfigurationsContent,
      );
      await createFile(userConfigurationsFile, newConfigurationContent);
    });

    console.log(`✔ Rebuilt configuration file.\n\nDone.\n\n`);

    await sleep(2000);
  } catch (err) {
    console.error(`✖ ERROR!\n\n${err}\n`);
    defaultScriptStop();
  }
}
