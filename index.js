const mineflayer = require('mineflayer');
const express = require('express');

// Express server for Keep-Alive
const app = express();
app.get('/', (req, res) => res.send('Bot is Alive!'));
app.listen(process.env.PORT || 3000, () => console.log('Web server running'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'JJUBAElsfah-z2ml.aternos.me',
    port: 11351, // تأكد أن هذا هو رقم الـ Port المكتوب في زر Connect بـ Aternos
    username: 'AFK_Guard_Bot',
    version: '1.21.4',
    checkTimeoutInterval: 60 * 1000
  });

  bot.on('spawn', () => {
    console.log('SUCCESS: Bot joined the server successfully!');
    // قفز كل 30 ثانية لتجنب الـ AFK kick
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Connection lost, reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', err => console.log('Error:', err.message));
}

createBot();