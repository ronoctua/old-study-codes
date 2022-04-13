import fs from 'fs';
import path from 'path';

import consoleRW from 'console-read-write';
import stringifyObject from 'stringify-object';

const __dirname = path.resolve();

const userConfigurationsFile = path.resolve(__dirname, 'configurations.mjs');
const exampleModuleImageFile = path.resolve(
  __dirname,
  'app',
  'src',
  'examples',
  'images',
  'module-image.gif',
);

function defaultScriptStop() {
  return process.exit();
}

async function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function createFile(file, fileContent) {
  try {
    fs.writeFileSync(file, fileContent);
  } catch (err) {
    console.error(`✖ ERROR ⤏ Could not create the file: ${file}\n\n${err}\n`);
    defaultScriptStop();
  }
}

function checkIfTheModuleAlreadyExists(modulePath) {
  if (fs.existsSync(modulePath)) {
    console.error(
      `\n✖ ERROR ⤏ This module already exists in the folder: ${modulePath}\n\n`,
    );
    defaultScriptStop();
  }
}

function createDirectory(path) {
  try {
    fs.mkdirSync(path, { recursive: true });
    console.log(`Directory created: ${path}`);
  } catch (err) {
    console.error(
      `\n✖ ERROR ⤏ Could not create directory: ${path}\n\n${err}\n`,
    );
    defaultScriptStop();
  }
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

async function createNewConfigurationContent(
  moduleName,
  currentConfigurationsContent,
) {
  try {
    const currentContent = currentConfigurationsContent;
    const modulesArray = currentContent.modules;

    const newModuleItem = {
      name: `${moduleName}`,
      configs: {
        exampleText: 'Hello World!',
      },
      container: 'middle-center',
    };

    const newModulesArray = [...modulesArray, newModuleItem];

    const newUserConfigurationsContent = `export const preferences = ${stringifyObject(
      currentContent.preferences,
    )};

export const styles = ${stringifyObject(currentContent.styles)};

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
      `✖ ERROR ⤏ Could not create a new configurations file content.\n\n${err}\n`,
    );
    defaultScriptStop();
  }
}

export async function createGitignoreContent() {
  let newGitignoreContent = `/node_modules
/.pnp
.pnp.js
yarn.lock
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
`;
  return newGitignoreContent;
}

export async function createDefaultConfigContent(moduleName) {
  let newDefaultConfigContent = `// This configuration file is used only once when installing the module.
export const defaultConfig = {
  name: '${moduleName}',
  configs: {
    exampleText: 'Hello World!',
  },
  container: 'middle-center',
};
`;
  return newDefaultConfigContent;
}

export async function createIndexContent(moduleName, moduleNameWithoutHyphen) {
  let newCreateIndexContent = `import React from 'react';
// Module and user settings must be taken from 'temp' folder.
import { modules } from '../../temp/configurations';
import { Container, BigText } from './styles';

export default function ${moduleNameWithoutHyphen}() {
  var moduleConfig = {};

  modules.filter(
    (theModule) =>
      theModule.name === '${moduleName}' && (moduleConfig = theModule.configs)
  );

  return (
    <Container>
      <h1>${moduleName}</h1>
      <BigText>{moduleConfig.exampleText}</BigText>
    </Container>
  );
}
`;
  return newCreateIndexContent;
}

export async function createReadmeContent(moduleName) {
  let newReadmeContent = `<!-- TIP: You can use GRIP to preview how this file will look on GitHub -->
<!-- GRIP repository: https://github.com/joeyespo/grip -->

<p align="center">
  <a href="https://github.com/ronoctua/DumbBot">
    <img src="module-image.gif">
  </a>
</p>

# ${moduleName}

🔹 **What is ${moduleName}?**

${moduleName} is a module for DumbBot. \`DBM\` means: _<ins>D</ins>umb<ins>B</ins>ot <ins>M</ins>odule_.

With this module you can...

🔹 **What is DumbBot?**

[DumbBot](https://https://github.com/ronoctua/DumbBot) is a modular program that runs apps in the system tray. With which you can easily create and run React apps in a component/module format.

🔹 **How to install ${moduleName}?**

To install this module is very easy. Just _(**1.**)_ run DumbBot, _(**2.**)_ choose the \`Add Module\` option, and then _(**3.**)_ paste the url of this repository.

🔹 **How to configure ${moduleName}?**

After installing, edit your \`configurations.mjs\` file.

Write your **########** there as in the example below:

\`\`\`JavaScript
export const modules = [
  {
    name: '${moduleName}',
    configs: {
      someConfig: '##############',
    },
    container: 'middle-center',
  },
]
\`\`\`
`;
  return newReadmeContent;
}

export async function createStylesContent() {
  let newStylesContent = `import styled from 'styled-components';

import { styles } from '../../temp/configurations';

export const Container = styled.div\`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-height: \${styles.maxHeight - 54 - styles.padding * 2}px;
  margin: 20px;
  overflow: auto;
\`;

export const BigText = styled.p\`
  font-size: 30px;
  color: \${styles.secondaryColor};
\`;
`;
  return newStylesContent;
}

export async function createModule() {
  try {
    console.log(`\n\n\n\n▸ Create module.\n`);

    let currentUserConfigurationsContent = {};
    let moduleName = '';
    let moduleNameWithoutHyphen = '';

    if (fs.existsSync(userConfigurationsFile)) {
      await import('../../../../configurations.mjs').then((modulesArray) => {
        currentUserConfigurationsContent = modulesArray;
      });
    }

    console.log('\nType the name of the new module (without spaces):');
    await consoleRW.read().then(async (answer) => {
      if (answer.substring(0, 4) !== 'DBM-') {
        moduleName = 'DBM-' + answer;
        moduleNameWithoutHyphen = moduleName.replace(/[^a-zA-Z]/g, '');
      } else {
        moduleName = answer;
        moduleNameWithoutHyphen = moduleName.replace(/[^a-zA-Z]/g, '');
      }
    });

    const modulePath = path.resolve(
      __dirname,
      'app',
      'src',
      'modules',
      moduleName,
    );

    checkIfTheModuleAlreadyExists(modulePath);
    createDirectory(modulePath);

    const gitignoreFile = path.resolve(modulePath, '.gitignore');
    const defaultConfigFile = path.resolve(modulePath, 'default-config.js');
    const indexFile = path.resolve(modulePath, 'index.js');
    const readmeFile = path.resolve(modulePath, 'readme.md');
    const stylesFile = path.resolve(modulePath, 'styles.js');
    const moduleImageFile = path.resolve(modulePath, 'module-image.gif');

    let newConfigurationContent = await createNewConfigurationContent(
      moduleName,
      currentUserConfigurationsContent,
    );

    let gitignoreContent = await createGitignoreContent();
    let defaultConfigContent = await createDefaultConfigContent(moduleName);
    let indexContent = await createIndexContent(
      moduleName,
      moduleNameWithoutHyphen,
    );
    let readmeContent = await createReadmeContent(moduleName);
    let stylesContent = await createStylesContent();

    createFile(userConfigurationsFile, newConfigurationContent);
    createFile(gitignoreFile, gitignoreContent);
    createFile(defaultConfigFile, defaultConfigContent);
    createFile(indexFile, indexContent);
    createFile(readmeFile, readmeContent);
    createFile(stylesFile, stylesContent);

    await copyFile(exampleModuleImageFile, moduleImageFile);

    console.log(
      `✔ Module ${moduleName} created in: ${modulePath}.\n\n\nDone.\n\n`,
    );
    await sleep(3000);
  } catch (err) {
    console.error(`✖ ERROR!\n\n${err}\n`);
    defaultScriptStop();
  }
}
