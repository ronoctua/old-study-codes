import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

const pronunciationSubtitle = document.querySelector('#pronunciation-subtitle');

const customSiteOneIcon = document.querySelector('#custom-site-one');
const customSiteTwoIcon = document.querySelector('#custom-site-two');
const customSiteThreeIcon = document.querySelector('#custom-site-three');
const customSiteFourIcon = document.querySelector('#custom-site-four');
const customSiteFiveIcon = document.querySelector('#custom-site-five');

const customSiteOneTitle = document.querySelector('#custom-site-one-title');
const customSiteTwoTitle = document.querySelector('#custom-site-two-title');
const customSiteThreeTitle = document.querySelector('#custom-site-three-title');
const customSiteFourTitle = document.querySelector('#custom-site-four-title');
const customSiteFiveTitle = document.querySelector('#custom-site-five-title');

const customSiteOneSubtitle = document.querySelector(
  '#custom-site-one-subtitle',
);
const customSiteTwoSubtitle = document.querySelector(
  '#custom-site-two-subtitle',
);
const customSiteThreeSubtitle = document.querySelector(
  '#custom-site-three-subtitle',
);
const customSiteFourSubtitle = document.querySelector(
  '#custom-site-four-subtitle',
);
const customSiteFiveSubtitle = document.querySelector(
  '#custom-site-five-subtitle',
);

CreateOrCheckDefaultData().then(() => {
  browser.storage.sync.get().then(async (data) => {
    pronunciationSubtitle.textContent =
      data.owlTools.pronunciation.popupSiteOne.whereToOpen;

    customSiteOneIcon.textContent =
      data.owlTools.customSites.customSiteOne.icon;
    customSiteTwoIcon.textContent =
      data.owlTools.customSites.customSiteTwo.icon;
    customSiteThreeIcon.textContent =
      data.owlTools.customSites.customSiteThree.icon;
    customSiteFourIcon.textContent =
      data.owlTools.customSites.customSiteFour.icon;
    customSiteFiveIcon.textContent =
      data.owlTools.customSites.customSiteFive.icon;

    customSiteOneTitle.textContent =
      data.owlTools.customSites.customSiteOne.title;
    customSiteTwoTitle.textContent =
      data.owlTools.customSites.customSiteTwo.title;
    customSiteThreeTitle.textContent =
      data.owlTools.customSites.customSiteThree.title;
    customSiteFourTitle.textContent =
      data.owlTools.customSites.customSiteFour.title;
    customSiteFiveTitle.textContent =
      data.owlTools.customSites.customSiteFive.title;

    customSiteOneSubtitle.textContent =
      data.owlTools.customSites.customSiteOne.whereToOpen;
    customSiteTwoSubtitle.textContent =
      data.owlTools.customSites.customSiteTwo.whereToOpen;
    customSiteThreeSubtitle.textContent =
      data.owlTools.customSites.customSiteThree.whereToOpen;
    customSiteFourSubtitle.textContent =
      data.owlTools.customSites.customSiteFour.whereToOpen;
    customSiteFiveSubtitle.textContent =
      data.owlTools.customSites.customSiteFive.whereToOpen;
  });
});
