// micro-bot
const { Composer } = require('micro-bot');
const bot = new Composer();

// puppeteer
const ss = require('./puppeteer');

// message
const msg = new Object();
msg.incorrectMessage = `The URL you entered is incorrect 😩\nmake sure the url you enter is correct and repeat again 👌😬`;
msg.waitMessage = "Wait a minute, it won't be long 😬";
msg.helpMessage = `

I will take a screenshot of the link you entered.

You can control me by sending these commands:

/link _url_

e.g. /link google.com

`;

// /start
bot.start((ctx) => {
   ctx.reply(`Hi, ${ctx.from.first_name}! 👏 ${msg.helpMessage}`);
});

// /link
bot.command('link', (ctx) => {
   let inputLink = ctx.message.text;
   let inputArr = inputLink.split(' ');
   let link = '';

   if (inputArr.length == 1) {
      link = 'Enter the URL after /link command\nExample: /link google.com';
   } else {
      ctx.reply(msg.waitMessage);
      inputArr.shift();
      link = inputArr.join(' ');

      // filter link
      if (!link.includes('http')) {
         link = 'http://' + link;
      }

      // screenshot the page
      ss.screenshot(link)
         .then((img) => {
            ctx.replyWithPhoto({ source: img });
         })
         .catch(() => {
            ctx.reply(msg.incorrectMessage);
         });
   }
});

bot.on('text', (ctx) => {
   ctx.reply('Enter the URL after /link command\nExample: /link google.com');
});

bot.on('sticker', (ctx) => {
   ctx.reply('Enter the URL after /link command\nExample: /link google.com');
});

module.exports = bot;
