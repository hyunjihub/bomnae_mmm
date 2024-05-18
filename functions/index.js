/* eslint-disable no-unused-vars */
const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
/* eslint-enable no-unused-vars */

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// CORS 미들웨어 적용
app.use(cors());

// getBlog 엔드포인트
app.get('/getBlog', async (req, res) => {
  const search = req.query.search;
  const clientId = functions.config().naver.client_id;
  const clientSecret = functions.config().naver.client_secret;

  if (!search) {
    res.status(400).send('Missing search parameter');
    return;
  }

  try {
    const response = await axios.get(
      `https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(search)}`,
      {
        headers: {
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
      }
    );

    if (response.status === 200) {
      const selectedItems = response.data.items.slice(0, 3); // 처음 3개 아이템 선택
      res.json(selectedItems);
    } else {
      res.status(response.status).send('검색 결과를 불러오지 못했습니다.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('오류가 발생했습니다.');
  }
});

// getCoordinates 엔드포인트
app.get('/getCoordinates', async (req, res) => {
  const address = req.query.address;
  const clientId = functions.config().ncp.client_id;
  const clientSecret = functions.config().ncp.client_secret;

  if (!address) {
    res.status(400).send('Missing address parameter');
    return;
  }

  try {
    const response = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': clientId,
          'X-NCP-APIGW-API-KEY': clientSecret,
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;
      const firstResult = data.addresses[0];
      if (firstResult) {
        res.json({ x: firstResult.x, y: firstResult.y });
      } else {
        res.status(404).send('No results found');
      }
    } else {
      res.status(response.status).send('Failed to fetch coordinates');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});

// Express 앱을 Cloud Functions에 래핑
exports.api = functions.https.onRequest(app);
