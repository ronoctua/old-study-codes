import React, { useState, useEffect } from 'react';
import axios from 'axios';
import path from 'path';
import { spawn } from 'child_process';

import {
  FaTwitter,
  FaListUl,
  FaClock,
  FaArrowUp,
  FaRegTrashAlt,
} from 'react-icons/fa';

import { modules } from '../../temp/configurations';

import {
  Container,
  MenuBar,
  LineBar,
  SectionContainer,
  Tweet,
  List,
} from './styles';

export default function DBMAutoTweet() {
  const [tweetToSave, setTweetToSave] = useState('');
  const [currentSection, setCurrentSection] = useState('last-tweet-section');
  const [nextTweet, setNextTweet] = useState(null);
  const [nextTweetText, setNextTweetText] = useState('');
  const [lastPostedTweet, setLastPostedTweet] = useState('');
  const [lastPostedTweetId, setLastPostedTweetId] = useState('');
  const [allScheduledTweets, setAllScheduledTweets] = useState({});

  const __dirname = path.resolve();
  const tweetScript = path.resolve(
    __dirname,
    '..',
    'src',
    'modules',
    'DBM-AutoTweet',
    'tweet.mjs',
  );

  var moduleConfig = {};

  modules.filter(
    (theModule) =>
      theModule.name === 'AutoTweet' && (moduleConfig = theModule.configs),
  );

  async function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  function handleMenuSectionSelection() {
    let allButtons = document.querySelectorAll('button.section-menu-button');
    let targetButtonName = '';
    let targetButtonElement = '';

    Array.from(allButtons).forEach((buttonElement) => {
      targetButtonName = buttonElement.getAttribute('name');
      targetButtonElement = document.querySelector(
        `button.section-menu-button[name="${targetButtonName}"]`,
      );

      targetButtonName === currentSection
        ? targetButtonElement.setAttribute('checked', '')
        : targetButtonElement.hasAttribute('checked') &&
          targetButtonElement.removeAttribute('checked');
    });

    handleSectionSelection();
  }

  function handleSectionSelection() {
    let allSections = document.querySelectorAll('div.section-container');
    let targetSectionName = '';
    let targetSectionElement = '';

    Array.from(allSections).forEach((sectionElement) => {
      targetSectionName = sectionElement.getAttribute('name');
      targetSectionElement = document.querySelector(
        `div.section-container[name="${targetSectionName}"]`,
      );

      targetSectionName === currentSection
        ? targetSectionElement.classList.remove('hide')
        : !targetSectionElement.classList.contains('hide') &&
          targetSectionElement.classList.add('hide');
    });
  }

  useEffect(() => {
    handleMenuSectionSelection();
  }, [currentSection]);

  useEffect(() => {
    handleNextTweet();
  }, [nextTweet]);

  useEffect(() => {
    handleLastPostedTweet();
  }, [lastPostedTweet]);

  useEffect(() => {
    handleAllScheduledTweets();
  }, [allScheduledTweets]);

  function handleLastPostedTweet() {
    axios({
      url: 'http://localhost:3003/db/get/AutoTweet/false/last',
      method: 'GET',
    })
      .then((tweetData) => {
        if (tweetData.data.universal !== null) {
          setLastPostedTweetId(tweetData.data.universal._id);
          setLastPostedTweet(tweetData.data.universal.text);
        }
      })
      .catch((err) => {
        setLastPostedTweet('ERROR!\n' + err);
      });
  }

  function handleNextTweet() {
    axios({
      url: 'http://localhost:3003/db/get/AutoTweet/true/first',
      method: 'GET',
    })
      .then((tweetData) => {
        if (tweetData.data.universal !== null) {
          setNextTweet(tweetData.data.universal);
          setNextTweetText(tweetData.data.universal.text);
        }
      })
      .catch((err) => {
        setNextTweetText('ERROR!\n' + err);
      });
  }

  function handleAllScheduledTweets() {
    axios({
      url: 'http://localhost:3003/db/get/AutoTweet/true',
      method: 'GET',
    })
      .then((tweetData) => {
        setAllScheduledTweets(tweetData.data.universal);
        handleNextTweet();
      })
      .catch((err) => {
        setAllScheduledTweets('ERROR!\n' + err);
      });
  }

  function handleTweetToSave(tweetMessage) {
    tweetMessage.length <= 280
      ? setTweetToSave(tweetMessage)
      : alert('Twitter accepts a maximum of 280 characters.');
  }

  function handleSaveTweet(event) {
    event.preventDefault();

    if (tweetToSave === '') return;

    let tweetDatabaseFormat = {
      name: 'AutoTweet',
      boolean: true,
      text: tweetToSave,
    };

    axios({
      url: 'http://localhost:3003/db/add',
      method: 'POST',
      data: tweetDatabaseFormat,
    })
      .then(() => {
        setTweetToSave(' SAVED!');
        setTimeout(() => {
          setTweetToSave('');
          setCurrentSection('all-tweets-section');
        }, 1500);
      })
      .catch((err) => {
        setTweetToSave('ERROR!\n' + err);
        setTimeout(() => {
          setTweetToSave('');
        }, 1500);
      });
  }

  function handleTweetToDelete(tweetId) {
    axios({
      url: `http://localhost:3003/db/del/${tweetId}`,
      method: 'DELETE',
    })
      .then(() => {
        handleAllScheduledTweets();
        handleNextTweet();
      })
      .catch((err) => {
        alert('ERROR!\n' + err);
      });
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
      // return process.exit();
    }
  }

  async function sendScheduledTweet(targetTweet) {
    let tweetToPostId = targetTweet._id;

    await runCommandInTheShell('node', tweetScript);

    await sleep(9000);

    axios({
      url: `http://localhost:3003/db/update/${tweetToPostId}`,
      method: 'POST',
      data: { boolean: false },
    })
      .then(() => {
        handleAllScheduledTweets();
        handleNextTweet();
        handleLastPostedTweet();
      })
      .catch((err) => {});
  }

  async function handleScheduleTweet(targetTweetId) {
    if (nextTweet === null) {
      return;
    } else if (targetTweetId === '') {
      sendScheduledTweet(nextTweet);
      return;
    }

    await axios({
      url: `http://localhost:3003/db/get/id/${targetTweetId}`,
      method: 'GET',
    })
      .then(async (tweetData) => {
        let lastTweetISODate = tweetData.data.universal.lastActiveAt;
        let lastTweetDate = new Date(lastTweetISODate);
        let tweetTimeout = new Date(lastTweetISODate);
        let todayDate = new Date();

        lastTweetDate.setDate(lastTweetDate.getDate());
        todayDate.setDate(todayDate.getDate());

        moduleConfig.tweetPostingSchedule === 'daily'
          ? tweetTimeout.setDate(lastTweetDate.getDate() + 1)
          : tweetTimeout.setDate(lastTweetDate.getDate() + 7);

        let timeToNextTweet = tweetTimeout - todayDate;

        if (timeToNextTweet < 0) {
          timeToNextTweet = 0;
        }

        setTimeout(() => {
          sendScheduledTweet(nextTweet);
        }, timeToNextTweet);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    handleScheduleTweet(lastPostedTweetId);
  }, [lastPostedTweetId]);

  return (
    <Container>
      <MenuBar>
        <button
          name="last-tweet-section"
          className="section-menu-button"
          onClick={() => setCurrentSection('last-tweet-section')}
        >
          <FaTwitter />
        </button>
        <button
          name="all-tweets-section"
          className="section-menu-button"
          onClick={() => setCurrentSection('all-tweets-section')}
        >
          <FaListUl />
        </button>
        <button
          name="schedule-tweet-section"
          className="section-menu-button"
          onClick={() => setCurrentSection('schedule-tweet-section')}
        >
          <FaClock />
        </button>
        {/* <button
          name="post-tweet-section"
          className="section-menu-button"
          onClick={() => setCurrentSection('post-tweet-section')}
        >
          <FaArrowUp />
        </button> */}
      </MenuBar>

      <SectionContainer
        name="last-tweet-section"
        className="section-container hide"
      >
        <LineBar>
          <h6>Next bot tweet</h6>
        </LineBar>
        <Tweet>{nextTweetText}</Tweet>
        <LineBar>
          <h6>Last bot tweet</h6>
        </LineBar>
        <Tweet>{lastPostedTweet}</Tweet>
      </SectionContainer>

      <SectionContainer
        name="all-tweets-section"
        className="section-container hide"
      >
        <List>
          <LineBar>
            <h4>All scheduled tweets</h4>
          </LineBar>
          {Array.from(allScheduledTweets).map((tweetData) => (
            <Tweet key={tweetData._id}>
              <button onClick={() => handleTweetToDelete(tweetData._id)}>
                <FaRegTrashAlt />
              </button>
              {tweetData.text}
            </Tweet>
          ))}
        </List>
      </SectionContainer>

      <SectionContainer
        name="schedule-tweet-section"
        className="section-container hide"
      >
        <form onSubmit={(e) => handleSaveTweet(e)}>
          <LineBar>
            <h4>Save a tweet</h4>
            <button>Save</button>
          </LineBar>
          <textarea
            name="tweet"
            value={tweetToSave}
            placeholder={
              lastPostedTweet === ''
                ? 'Your first tweet will be posted immediately and the next tweets will be scheduled.'
                : 'Tweet text to schedule..'
            }
            onChange={(e) => handleTweetToSave(e.target.value)}
          ></textarea>
        </form>
      </SectionContainer>

      {/* <SectionContainer
        name="post-tweet-section"
        className="section-container hide"
      >
        <LineBar>
          <h4>Post a tweet</h4>
        </LineBar>
      </SectionContainer> */}
    </Container>
  );
}
