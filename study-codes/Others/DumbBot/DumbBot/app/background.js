import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const __dirname = path.resolve();

const pudimFolder = path.resolve(__dirname, 'PUDIMMMM');

async function createDirectory(directoryToCreate) {
  try {
    if (!fs.existsSync(directoryToCreate)) {
      fs.mkdirSync(directoryToCreate, { recursive: true });
    }
  } catch (err) {
    console.error(
      `✖ ERROR ⤏ Could not create directory: ${directoryToCreate}\n\n${err}\n`,
    );
  }
}

createDirectory(pudimFolder);

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
  }
}

console.log('PUUUUUUUUUUDIM!!!!!!!');
console.log('PUUUUUUUUUUDIM!!!!!!!');
console.log('PUUUUUUUUUUDIM!!!!!!!');
console.log('PUUUUUUUUUUDIM!!!!!!!');
console.log('PUUUUUUUUUUDIM!!!!!!!');
console.log('PUUUUUUUUUUDIM!!!!!!!');
console.log(__dirname);
runCommandInTheShell('echo', `${__dirname}`);
runCommandInTheShell('echo', 'BIGORNA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
runCommandInTheShell('echo', 'BIGORNA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
runCommandInTheShell('echo', 'BIGORNA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
runCommandInTheShell('echo', 'BIGORNA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
runCommandInTheShell('echo', 'BIGORNA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
runCommandInTheShell('echo', 'BIGORNA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
