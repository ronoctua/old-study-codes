import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { modules } from '../../temp/configurations';
import { Container } from './styles';

export default function DBMB() {
  const [bovespaData, setBovespaData] = useState([]);
  const [b3CurrentDate, setB3CurrentDate] = useState('');

  var moduleConfig = {};

  modules.filter(
    (theModule) =>
      theModule.name === 'DBM-B3' && (moduleConfig = theModule.configs),
  );

  async function getBovespaData() {
    let newBovespaData = [];
    let yesterday = '';
    let urlYesterday = '';
    let beforeYesterday = '';
    let urlBeforeYesterday = '';
    let num = 1;

    for (num; num < 3; num++) {
      let b3Date = new Date();
      let b3UrlDate = '';

      b3Date = new Date(b3Date.setDate(b3Date.getDate() - num));
      b3Date = b3Date.toLocaleString([], { timeZone: 'America/Sao_Paulo' });
      b3Date = b3Date.replace(/ .*/, '');

      b3UrlDate = b3Date.split('/');
      b3UrlDate = b3UrlDate[2] + '-' + b3UrlDate[1] + '-' + b3UrlDate[0];

      num === 1 ? (yesterday = b3Date) : (beforeYesterday = b3Date);
      num === 1 ? (urlYesterday = b3UrlDate) : (urlBeforeYesterday = b3UrlDate);
    }

    for await (let code of moduleConfig.targets) {
      let codeUpperCase = code.toUpperCase();

      await axios({
        url: `https://bovespa.nihey.org/api/quote/${codeUpperCase}/${urlYesterday}`,
        method: 'GET',
      })
        .then((data) => {
          newBovespaData.push({
            targetCode: codeUpperCase,
            targetValue: data.data.preofc,
          });
          setB3CurrentDate(yesterday);
        })
        .catch(async (err) => {
          await axios({
            url: `https://bovespa.nihey.org/api/quote/${codeUpperCase}/${urlBeforeYesterday}`,
            method: 'GET',
          })
            .then((data) => {
              newBovespaData.push({
                targetCode: codeUpperCase,
                targetValue: data.data.preofc,
              });
              setB3CurrentDate(beforeYesterday);
            })
            .catch((err) => {
              console.error('ERROR!\n' + err);
            });
        });
    }

    setBovespaData(newBovespaData);
  }

  async function updateData() {
    await getBovespaData();
  }

  useEffect(() => {
    updateData();
  }, []);

  return (
    <Container>
      <div>
        <button onClick={() => updateData()}>↻</button> <h4>B3</h4>
        <i> ➜ {b3CurrentDate}</i>
      </div>
      {bovespaData.map((target, index) => (
        <div key={index}>
          <span>
            <b>{target.targetCode}</b>
          </span>
          <span>R$ {target.targetValue}</span>
        </div>
      ))}
    </Container>
  );
}
