const handleNotes = () => {
  document.querySelector('#notes').onclick = () => {
    document.location.replace('../../../src/pages/Notes/index.html');
  };
};

export default handleNotes;
