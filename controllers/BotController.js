const { screenshot } = require('../screenshot');
const { sendMessage, deleteMessage, sendFile, sendPhoto } = require('../helpers');

let responseMessages = {
  welcome: 'Welcome to LINKHUT!',
  inputLink: `Check URL by sending command: /link {url}\n\ne.g. /link google.com`,
  wait: "Wait a minute, it won't be long 😬",
  incorrect: `The URL you entered is incorrect 😩\nmake sure the url you enter is correct and repeat again 👌😬`,
  command: 'Enter the URL after /link command\nExample: /link google.com',
  support: 'For any question or business inquiries please contact @x0code',
  donation:
    'Your support matters. This project survives on the kindness & generosity of your contributions.\n\nhttps://saweria.co/x0code \n\nThankyou!',
  otherProjects: 'Soon',
};

module.exports = async (req, res) => {
  let message = req.body?.message;
  let chat_id = message?.chat.id;
  let text = message?.text;

  console.log(message);

  if (text === '/start') {
    await sendMessage({
      chat_id,
      text: responseMessages.welcome,
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          ['⚓️ Input Link', '🪵 Other Projects'],
          ['💰 Donation', '🤠 Support'],
        ],
      },
    });

    return res.send();
  }

  if (text === '⚓️ Input Link') {
    await sendMessage({
      chat_id,
      text: responseMessages.inputLink,
    });

    return res.send();
  }

  if (text === '🤠 Support') {
    await sendMessage({
      chat_id,
      text: responseMessages.support,
    });

    return res.send();
  }

  if (text === '💰 Donation') {
    await sendMessage({
      chat_id,
      text: responseMessages.donation,
    });

    return res.send();
  }

  if (text === '🪵 Other Projects') {
    await sendMessage({
      chat_id,
      text: responseMessages.otherProjects,
    });

    return res.send();
  }

  if (text.includes('/link')) {
    let inputArr = text.split(' ');
    let link = '';

    if (inputArr.length <= 1) {
      await sendMessage({ chat_id, text: responseMessages.command });
    } else {
      let { message_id } = await sendMessage({ chat_id, text: responseMessages.wait });

      inputArr.shift();
      link = inputArr.join(' ');

      // filter link
      if (!link.includes('http')) {
        link = 'http://' + link;
      }

      // screenshot the page
      screenshot(link)
        .then(async (document) => {
          await deleteMessage({ chat_id, message_id });
          await sendPhoto({ chat_id, document, name: 'image.png' });
        })
        .catch(async (err) => {
          await sendMessage({ chat_id, text: responseMessages.incorrect });
        });
    }
    return res.send();
  }

  await sendMessage({ chat_id, text: responseMessages.inputLink });
  return res.send();
};
