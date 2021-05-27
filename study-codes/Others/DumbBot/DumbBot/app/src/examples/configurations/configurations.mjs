export const preferences = {
  startDbCommand: 'docker start mongodb',
  startDbAndServer: false,
};

export const styles = {
  maxWidth: 800,
  maxHeight: 240,
  padding: 0,
  trayIcon: 'gray', // gray, white and black
  background: '#1d1d1dfa', // supports transparency
  border: '1px solid #27272796',
  textColor: '#f4f4f4',
  primaryColor: '#00eca9',
  secondaryColor: '#6d22b9',
};

export const modules = [
  {
    name: 'DBM-Image',
    configs: {},
    container: 'middle-left',
  },
];

// Containers schematic:
//  top-left     ┋ top-center    ┋ top-right
// ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
//  middle-left  ┋ middle-center ┋ middle-right
// ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
//  bottom-left  ┋ bottom-center ┋ bottom-right
