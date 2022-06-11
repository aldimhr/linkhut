require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');

const { BOT_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const sendMessage = async (options) => {
  const { data } = await axios.post(`${TELEGRAM_API}/sendMessage`, options);

  return data.result;
};

const deleteMessage = async (options) => {
  const { data } = await axios.post(`${TELEGRAM_API}/deleteMessage`, options);

  return data;
};

const sendPhoto = async (data) => {
  const formData = new FormData();
  formData.append('chat_id', data.chat_id);
  formData.append('photo', data.document, {
    filename: `${data.name}`,
    contentType: 'multipart/form-data',
  });

  return await axios.post(`${TELEGRAM_API}/sendPhoto`, formData, {
    headers: formData.getHeaders(),
  });
};

const sendFile = async (data) => {
  const formData = new FormData();
  formData.append('chat_id', data.chat_id);
  formData.append('document', data.document, {
    filename: `${data.name}`,
    contentType: 'multipart/form-data',
  });

  return await axios.post(`${TELEGRAM_API}/sendDocument`, formData, {
    headers: formData.getHeaders(),
  });
};

module.exports = { sendMessage, sendPhoto, deleteMessage, sendFile };
