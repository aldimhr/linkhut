const { Composer } = require('micro-bot');
const bot = new Composer();
const ss = require('./puppeteer');

const helpMessage = `

Bot ini akan mengambil tangkapan layar (screenshot) dari link yang kamu masukkan.

Contoh: /link google.com

Command yang dapat digunakan:

/start - Start bot
/link {input} - Get screenshot
/stop - Stop bot

`;

// /start
bot.start((ctx) => {
   ctx.reply(`Hai, ${ctx.from.first_name}! 👏 ${helpMessage}`);
});

// /link
bot.command('link', (ctx) => {
   let inputLink = ctx.message.text;
   let inputArr = inputLink.split(' ');
   let link = '';

   if (inputArr.length == 1) {
      link = 'Masukkan URL setelah /link \nContoh: /link google.com';
   } else {
      ctx.reply('Tunggu sebentar ya 😬');
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
            ctx.reply('URL yang anda masukkan salah 😩\nUlangi lagi 👌😬');
         });
   }
});

// help
bot.help((ctx) => {
   ctx.reply(helpMessage);
});

// /settings
bot.settings((ctx) => {
   ctx.reply('Welcome');
});

module.exports = bot;
