const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bot is Alive!'));
app.listen(process.env.PORT || 3000, () => console.log('Web server running'));

function createBot() {
  console.log('Attempting to connect to Aternos...');
  
  const bot = mineflayer.createBot({
    host: 'JJUBAElsfah-z2ml.aternos.me',
    port: 11351,
    username: 'AFK_Guard_Bot',
    version: '1.21.4',
    checkTimeoutInterval: 60 * 1000
  });

  bot.on('spawn', () => {
    console.log('SUCCESS: Bot joined the server successfully!');
  });

  // كشف سبب الطرد أو المنع بالضبط
  bot.on('kicked', (reason) => {
    console.log('KICKED BY SERVER:', JSON.stringify(reason));
  });

  bot.on('end', (reason) => {
    console.log('Disconnected:', reason, '-> Waiting 30 seconds before reconnecting...');
    setTimeout(createBot, 30000); // رفع مهلة إعادة الاتصال لعدم حظر الـ IP
  });

  bot.on('error', (err) => console.log('BOT ERROR:', err.message));
}

createBot();