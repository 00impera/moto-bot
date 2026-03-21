require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const GAME_URL = 'https://moto-runner.imperamonad.xyz/';
const CONTRACT = '0xD49e4A6caEDf6e06C8E520E90518F7cDAcEbBd63';

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || 'Rider';
  bot.sendMessage(chatId,
    `⚡ *MOTO RUNNER*\n\n` +
    `Welcome, ${name}! 🏍\n\n` +
    `▸ Ride · Shoot · Collect · Earn\n` +
    `▸ Chain: Monad #143\n` +
    `▸ Token: $MOTO\n\n` +
    `_Choose your action below:_`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🎮 PLAY NOW', web_app: { url: GAME_URL } }],
          [{ text: '💰 Balance', callback_data: 'balance' },
           { text: '🏆 Leaderboard', callback_data: 'leaderboard' }],
          [{ text: '⛓ Claim MOTO', callback_data: 'claim' },
           { text: '❓ Help', callback_data: 'help' }]
        ]
      }
    }
  );
});

bot.onText(/\/play/, (msg) => {
  bot.sendMessage(msg.chat.id, '🎮 *Ready to ride?*\n\nOpen MOTO Runner and start earning!', {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [[{ text: '🏍 PLAY NOW', web_app: { url: GAME_URL } }]]
    }
  });
});

bot.onText(/\/balance/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `💰 *MOTO Token Balance*\n\n` +
    `Connect your wallet in the game to check your $MOTO balance!\n\n` +
    `⛓ Contract:\n\`${CONTRACT}\``,
    { parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: [[{ text: '🎮 Open Game', web_app: { url: GAME_URL } }]] }
    }
  );
});

bot.onText(/\/claim/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `⛓ *Claim MOTO Tokens*\n\n` +
    `Open the game, connect your wallet and claim your earned $MOTO!\n\n` +
    `🪙 Earn by racing · completing levels · top scores`,
    { parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: [[{ text: '⛓ Claim Now', web_app: { url: GAME_URL } }]] }
    }
  );
});

bot.onText(/\/leaderboard/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `🏆 *Top MOTO Riders*\n\n` +
    `Think you have what it takes?\n` +
    `Race to the top and claim your glory!`,
    { parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: [[{ text: '🏆 View Leaderboard', web_app: { url: GAME_URL } }]] }
    }
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `❓ *MOTO Runner Help*\n\n` +
    `🎮 /play — Open the game\n` +
    `💰 /balance — Check $MOTO balance\n` +
    `⛓ /claim — Claim MOTO tokens\n` +
    `🏆 /leaderboard — Top riders\n\n` +
    `🌐 ${GAME_URL}\n` +
    `⛓ Chain: Monad #143`,
    { parse_mode: 'Markdown' }
  );
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  if (data === 'balance') bot.sendMessage(chatId, `💰 *MOTO Token Balance*\n\nConnect your wallet in the game!\n\n⛓ Contract:\n\`${CONTRACT}\``, { parse_mode: 'Markdown', reply_markup: { inline_keyboard: [[{ text: '🎮 Open Game', web_app: { url: GAME_URL } }]] } });
  if (data === 'leaderboard') bot.sendMessage(chatId, `🏆 *Top MOTO Riders*\n\nRace to the top and claim your glory!`, { parse_mode: 'Markdown', reply_markup: { inline_keyboard: [[{ text: '🏆 View Leaderboard', web_app: { url: GAME_URL } }]] } });
  if (data === 'claim') bot.sendMessage(chatId, `⛓ *Claim MOTO Tokens*\n\nOpen the game and claim your $MOTO!`, { parse_mode: 'Markdown', reply_markup: { inline_keyboard: [[{ text: '⛓ Claim Now', web_app: { url: GAME_URL } }]] } });
  if (data === 'help') bot.sendMessage(chatId, `❓ *MOTO Runner Help*\n\n🎮 /play — Open the game\n💰 /balance — Check balance\n⛓ /claim — Claim tokens\n🏆 /leaderboard — Top riders`, { parse_mode: 'Markdown' });
  bot.answerCallbackQuery(query.id);
});

console.log('🏍 MOTO Runner Bot is running...');
