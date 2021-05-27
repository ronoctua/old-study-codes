import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import axios from 'axios';

const __dirname = path.resolve();
const buildAssetsDirectory = path.resolve(__dirname, 'app', 'build', 'assets');
const buildIconsDirectory = path.resolve(
  __dirname,
  'app',
  'build',
  'assets',
  'icons',
);
const iconsDirectory = path.resolve(__dirname, 'app', 'src', 'assets', 'icons');
const appFolder = path.resolve(__dirname, 'app');
const nwReactScripts = path.resolve(
  __dirname,
  'app',
  'node_modules',
  'nw-react-scripts',
  'bin',
  'nw-react-scripts.js',
);
const configurationsFile = path.resolve(
  __dirname,
  'app',
  'src',
  'temp',
  'configurations.mjs',
);
const userConfigurationsFile = path.resolve(__dirname, 'configurations.mjs');
const serverPath = path.resolve(
  __dirname,
  'app',
  'src',
  'server-db-test',
  'server.js',
);

const dumbBotAsciiArt = `
 ╔╦╗┬ ┬┌┬┐┌┐ ╔╗ ┌─┐┌┬┐
  ║║│ ││││├┴┐╠╩╗│ │ │
 ═╩╝└─┘┴ ┴└─┘╚═╝└─┘ ┴
`;

function defaultScriptStop() {
  return process.exit();
}

async function createDirectory(directoryToCreate) {
  try {
    if (!fs.existsSync(directoryToCreate)) {
      fs.mkdirSync(directoryToCreate, { recursive: true });
    }
  } catch (err) {
    console.error(
      `✖ ERROR ⤏ Could not create directory: ${directoryToCreate}\n\n${err}\n`,
    );
    defaultScriptStop();
  }
}

function copyFile(source, target) {
  var targetFile = target;

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

async function copyDirectory(sourceFolder, destinationFolder) {
  try {
    let files = [];

    // check if folder needs to be created or integrated
    let targetFolder = path.join(
      destinationFolder,
      path.basename(sourceFolder),
    );
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }

    // copy
    if (fs.lstatSync(sourceFolder).isDirectory()) {
      files = fs.readdirSync(sourceFolder);
      files.forEach(function (file) {
        let curSource = path.join(sourceFolder, file);
        if (fs.lstatSync(curSource).isDirectory()) {
          copyDirectory(curSource, targetFolder);
        } else {
          copyFile(curSource, targetFolder);
        }
      });
    }
    console.log(`✔ Copied: ${sourceFolder} to ⤏ ${destinationFolder}`);
  } catch (err) {
    console.error(
      `✖ ERROR ⤏ Could not copy: ${sourceFolder} to ⤏ ${destinationFolder}\n\n${err}\n`,
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

  for await (const data of shellCommand.stderr) {
    console.error(`✖ ERROR!\n` + data);
    defaultScriptStop();
  }
}

async function getResponseFromUrl(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    let status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
}

async function checkDbAndServer() {
  if (fs.existsSync(userConfigurationsFile)) {
    await import(userConfigurationsFile).then(async (configurations) => {
      async function checkAndStartDbAndServer() {
        await axios
          .get('http://localhost:3003/status')
          .then((response) => {
            response.status === 200 && console.log('⁎ Server running.');
          })
          .catch(async () => {
            console.log('▸ Starting server and database.');
            await runCommandInTheShell(
              configurations.preferences.startDbCommand,
              '',
            );
            setTimeout(async () => {
              await runCommandInTheShell('node', serverPath);
            }, 3000);
          });
      }

      configurations.preferences.startDbAndServer === true
        ? await checkAndStartDbAndServer()
        : console.log('⁎ Server and database will not start.');
    });
  }
}

export async function runDevMode() {
  console.log(`\n▸ Starting development mode`);

  await createDirectory(buildIconsDirectory);
  await copyDirectory(iconsDirectory, buildAssetsDirectory);
  copyFile(userConfigurationsFile, configurationsFile);

  await checkDbAndServer();

  setTimeout(() => {
    console.log(`\n\n\n\n\n\n\n\n\n\n\n\nDev mode started 🖖\n`);
  }, 10000);

  setTimeout(() => {
    console.log(
      `\n\n\n\n\n\n\n\n\n\n` +
        dumbBotAsciiArt +
        `Dev mode instructions:\n` +
        `⁎ The first time you run Dev Mode, it may take 1 or 2 minutes to display the icon;\n` +
        `⁎ If tray icon does not appear, try to close and reopen the app and terminal;\n` +
        `⁎ To close DumbBot, press 'Ctrl + c' here on terminal.\n`,
    );
  }, 18000);

  runCommandInTheShell(`cd ${appFolder}`, `&& ${nwReactScripts} start`);
}
