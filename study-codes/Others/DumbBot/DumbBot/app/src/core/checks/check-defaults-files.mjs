import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const moduleDBMImage = path.resolve(
  __dirname,
  'app',
  'src',
  'modules',
  'DBM-Image',
);
const exampleModuleDBMImage = path.resolve(
  __dirname,
  'app',
  'src',
  'examples',
  'modules',
  'DBM-Image',
);
const userConfigurationsFile = path.resolve(__dirname, 'configurations.mjs');
const configurationsExampleFile = path.resolve(
  __dirname,
  'app',
  'src',
  'examples',
  'configurations',
  'configurations.mjs',
);

function defaultScriptStop() {
  return process.exit();
}

async function copyFile(sourcePathAndFileName, destinationPathAndFileName) {
  try {
    fs.copyFileSync(
      sourcePathAndFileName,
      destinationPathAndFileName,
      fs.constants.COPYFILE_EXCL,
    );
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

async function copyDirectory(sourceFolder, destinationFolder) {
  let exists = fs.existsSync(sourceFolder);
  let stats = exists && fs.statSync(sourceFolder);
  let isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(destinationFolder);
    fs.readdirSync(sourceFolder).forEach((childItemName) => {
      copyDirectory(
        path.join(sourceFolder, childItemName),
        path.join(destinationFolder, childItemName),
      );
    });
  } else {
    fs.copyFileSync(sourceFolder, destinationFolder);
  }
}

export async function checkDefaultFiles() {
  !fs.existsSync(userConfigurationsFile)
    ? await copyFile(configurationsExampleFile, userConfigurationsFile)
    : console.log('✔ Configuration file.');

  !fs.existsSync(moduleDBMImage)
    ? await copyDirectory(exampleModuleDBMImage, moduleDBMImage)
    : console.log('⁎ Sample module detected.');
}
