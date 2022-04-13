const handleLoremIpsum = () => {
  document.querySelector('#lorem-ipsum').onclick = () => {
    document.location.replace('../../../src/pages/LoremIpsum/index.html');
  };
};

export default handleLoremIpsum;
