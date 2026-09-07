const mineflayer = require('mineflayer');
const express = require('express');

// Create a simple web server for keep-alive
const app = express();
app.get('/', (req, res) => res.send('Bot is Alive!'));
app.listen(process.env.PORT || 3000, () => console.log('Web server running'));

function createBot() {
  const bot = mineflayer.createBot({
  host: 'JJUBAElsfah-z2mI.aternos.me',
    port: 11351,
    username: 'AFK_Guard_Bot'
  });

  bot.on('spawn', () => {
    console.log('Bot joined the server successfully!');
    // Anti-AFK jump every 30 seconds
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Connection lost, reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', err => console.log('Error:', err));
}

createBot();