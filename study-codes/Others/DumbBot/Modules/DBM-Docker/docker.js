import { spawnSync } from 'child_process';

export function listAllConteiners() {
  let data = spawnSync('docker', [
    'ps',
    '-a',
    '--format',
    '{{.ID}} {{.Names}}',
  ]).output.toString('utf8');

  data = data.split(',').join('');
  data = data.split('\n').filter(String);
  return data;
}

export function listActiveContainers() {
  let data = spawnSync('docker', [
    'ps',
    '--format',
    '{{.ID}} {{.Names}}',
  ]).output.toString('utf8');

  data = data.split(',').join('');
  data = data.split('\n').filter(String);
  return data;
}

export function startOrStopContainer(containerCurrentStatus, containerId) {
  containerCurrentStatus === 'inactive'
    ? spawnSync('docker', ['start', containerId])
    : spawnSync('docker', ['stop', containerId]);
}
