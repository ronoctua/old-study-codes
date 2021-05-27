import axios from 'axios';
import Twit from 'twit';

import { modules } from '../../temp/configurations.mjs';

var moduleConfig = {};

modules.filter(
  (theModule) =>
    theModule.name === 'DBM-AutoTweet' && (moduleConfig = theModule.configs),
);

const apiKey = moduleConfig.apiKey;
const apiSecretKey = moduleConfig.apiSecretKey;
const accessToken = moduleConfig.accessToken;
const accessTokenSecret = moduleConfig.accessTokenSecret;

const twitter = new Twit({
  consumer_key: apiKey,
  consumer_secret: apiSecretKey,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
});

function postTweet() {
  axios({
    url: 'http://localhost:3003/db/get/AutoTweet/true/first',
    method: 'GET',
  })
    .then((tweetData) => {
      if (tweetData.data.universal !== null) {
        let tweetTextToPost = tweetData.data.universal.text;

        twitter.post(
          'statuses/update',
          { status: tweetTextToPost },
          (err, data, response) => {
            if (!err) {
              console.log('Tweet posted!');
            } else {
              console.error('>>> Twitter error\n', err);
            }
          },
        );
      }
    })
    .catch((err) => {
      console.error('ERROR!\n' + err);
    });
}

postTweet();
