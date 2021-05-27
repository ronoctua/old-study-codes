import fs from 'fs';
import path from 'path';

import { checkDefaultFiles } from '../checks/check-defaults-files.mjs';

const __dirname = path.resolve();

const userConfigurationsFile = path.resolve(__dirname, 'configurations.mjs');

var modules = [];

if (fs.existsSync(userConfigurationsFile)) {
  import('../../../../configurations.mjs').then((modulesArray) => {
    modules = modulesArray.modules;
  });
} else {
  checkDefaultFiles().then(
    import('../../../../configurations.mjs').then((modulesArray) => {
      modules = modulesArray.modules;
    }),
  );
}

const modulesFile = path.resolve(__dirname, 'app', 'src', 'temp', 'modules.js');

function defaultScriptStop() {
  return process.exit();
}

async function createFile(file, fileContent) {
  fs.writeFile(file, fileContent, function (err) {
    if (err) {
      console.error(`✖ ERROR ⤏ Could not create the file: ${file}\n\n${err}\n`);
      defaultScriptStop();
    }
  });
}

async function modulesFileContentCreator(modulesArray) {
  let modulesTopLeft = [];
  let modulesTopCenter = [];
  let modulesTopRight = [];
  let modulesMiddleLeft = [];
  let modulesMiddleCenter = [];
  let modulesMiddleRight = [];
  let modulesBottomLeft = [];
  let modulesBottomCenter = [];
  let modulesBottomRight = [];
  let modulesImports = [];

  await modulesArray.forEach((module) => {
    let moduleNameModified = `${module.name.replace(/[^a-zA-Z0-9]/g, '')}`;
    let moduleTag = `<${moduleNameModified} />`;

    modulesImports = [
      ...modulesImports,
      `import ${moduleNameModified} from "../modules/${module.name}"`,
    ];

    module.container === 'top-left' &&
      (modulesTopLeft = [...modulesTopLeft, moduleTag]);

    module.container === 'top-center' &&
      (modulesTopCenter = [...modulesTopCenter, moduleTag]);

    module.container === 'top-right' &&
      (modulesTopRight = [...modulesTopRight, moduleTag]);

    module.container === 'middle-left' &&
      (modulesMiddleLeft = [...modulesMiddleLeft, moduleTag]);

    module.container === 'middle-center' &&
      (modulesMiddleCenter = [...modulesMiddleCenter, moduleTag]);

    module.container === 'middle-right' &&
      (modulesMiddleRight = [...modulesMiddleRight, moduleTag]);

    module.container === 'bottom-left' &&
      (modulesBottomLeft = [...modulesBottomLeft, moduleTag]);

    module.container === 'bottom-center' &&
      (modulesBottomCenter = [...modulesBottomCenter, moduleTag]);

    module.container === 'bottom-right' &&
      (modulesBottomRight = [...modulesBottomRight, moduleTag]);
  });

  let moduleFileContent = `import React from 'react';
${modulesImports.join('\n')}

export function ModulesTopLeft() {
  return (
    <>
      ${modulesTopLeft.join('\n      ')}
    </>
  );
}
export function ModulesTopCenter() {
  return (
    <>
      ${modulesTopCenter.join('\n      ')}
    </>
  );
}
export function ModulesTopRight() {
  return (
    <>
      ${modulesTopRight.join('\n      ')}
    </>
  );
}
export function ModulesMiddleLeft() {
  return (
    <>
      ${modulesMiddleLeft.join('\n      ')}
    </>
  );
}
export function ModulesMiddleCenter() {
  return (
    <>
      ${modulesMiddleCenter.join('\n      ')}
    </>
  );
}
export function ModulesMiddleRight() {
  return (
    <>
      ${modulesMiddleRight.join('\n      ')}
    </>
  );
}
export function ModulesBottomLeft() {
  return (
    <>
      ${modulesBottomLeft.join('\n      ')}
    </>
  );
}
export function ModulesBottomCenter() {
  return (
    <>
      ${modulesBottomCenter.join('\n      ')}
    </>
  );
}
export function ModulesBottomRight() {
  return (
    <>
      ${modulesBottomRight.join('\n      ')}
    </>
  );
}
  `;

  return moduleFileContent;
}

export async function createModulesComponentsListFile() {
  try {
    const modulesFileContent = await modulesFileContentCreator(modules);
    await createFile(modulesFile, modulesFileContent);
    console.log(`\n✔ Modules components list file created.`);
  } catch (err) {
    console.error(
      `✖ ERROR ⤏ Could not create the components list file.\n\n${err}\n`,
    );
    defaultScriptStop();
  }
}
