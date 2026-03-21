require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const GAME_URL = 'https://moto-runner.imperamonad.xyz/';
const CONTRACT = '0xD49e4A6caEDf6e06C8E520E90518F7cDAcEbBd63';
const CHAIN_ID = 143;
const EXPLORER = 'https://monad.socialscan.io';

const mainKeyboard = {
  inline_keyboard: [
    [{ text: '🎮 PLAY MOTO RUNNER', url: GAME_URL }],
    [
      { text: '💰 Balance', callback_data: 'balance' },
      { text: '🏆 Leaderboard', callback_data: 'leaderboard' }
    ],
    [
      { text: '⛓ Claim MOTO', callback_data: 'claim' },
      { text: '📜 Contract', callback_data: 'contract' }
    ],
    [
      { text: '❓ Help', callback_data: 'help' },
      { text: '🌐 Website', url: GAME_URL }
    ]
  ]
};

const backKeyboard = {
  inline_keyboard: [[
    { text: '🎮 Play Now', url: GAME_URL },
    { text: '⬅️ Back', callback_data: 'back' }
  ]]
};

const WELCOME = (name) => `
🏍 *MOTO RUNNER*
━━━━━━━━━━━━━━━━━━━━

Welcome, *${name}*! 

▸ Race · Shoot · Collect · Earn
▸ Chain: Monad #${CHAIN_ID}
▸ Token: $MOTO

🥇 Win races → Earn MOTO tokens
🔫 Shoot enemies → Bonus points  
🪙 Collect coins → Extra rewards

🌐 moto-runner.imperamonad.xyz
━━━━━━━━━━━━━━━━━━━━
Ready to ride? 👇
`;

const HOW_TO_PLAY = `
🎮 *HOW TO PLAY*
━━━━━━━━━━━━━━━━━━━━

*Step 1* — Open the game
*Step 2* — Connect MetaMask wallet
*Step 3* — Switch to Monad (Chain ID: 143)
*Step 4* — Choose your character
*Step 5* — Race · Shoot · Earn!

*Characters:*
🔴 Street Red — Speed build
🔵 Dirt Blue — Armor build
🟢 Neon Green — Balanced
🟣 Cyber Purple — Attack build
🟡 Ghost Gold — Stealth build

━━━━━━━━━━━━━━━━━━━━
100% on-chain rewards
`;

bot.onText(/\/start/, (msg) => {
  const name = msg.from.first_name || 'Rider';
  bot.sendMessage(msg.chat.id, WELCOME(name), {
    parse_mode: 'Markdown',
    reply_markup: mainKeyboard
  });
});

bot.onText(/\/play/, (msg) => {
  bot.sendMessage(msg.chat.id,
    '🎮 *Ready to ride?*\n\nOpen MOTO Runner and start earning $MOTO!',
    {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: [[{ text: '🏍 PLAY NOW', url: GAME_URL }]] }
    }
  );
});

bot.onText(/\/balance/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `💰 *MOTO Token Balance*\n\n━━━━━━━━━━━━━━━━━━━━\nConnect your wallet in the game to check your $MOTO balance!\n\n📍 Contract:\n\`${CONTRACT}\`\n\n🔗 Network: Monad #${CHAIN_ID}\n━━━━━━━━━━━━━━━━━━━━`,
    {
      parse_mode: 'Markdown',
      reply_markup: backKeyboard
    }
  );
});

bot.onText(/\/claim/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `⛓ *Claim MOTO Tokens*\n\n━━━━━━━━━━━━━━━━━━━━\nOpen the game, connect your wallet and claim your earned $MOTO!\n\n🪙 Earn by:\n▸ Racing and winning\n▸ Completing levels\n▸ Top leaderboard scores\n━━━━━━━━━━━━━━━━━━━━`,
    {
      parse_mode: 'Markdown',
      reply_markup: backKeyboard
    }
  );
});

bot.onText(/\/leaderboard/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `🏆 *Top MOTO Riders*\n\n━━━━━━━━━━━━━━━━━━━━\nThink you have what it takes?\nRace to the top and claim your glory!\n\n🥇 1st — Maximum MOTO rewards\n🥈 2nd — High MOTO rewards  \n🥉 3rd — MOTO rewards\n━━━━━━━━━━━━━━━━━━━━`,
    {
      parse_mode: 'Markdown',
      reply_markup: backKeyboard
    }
  );
});

bot.onText(/\/contract/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `📜 *Contract Info*\n\n━━━━━━━━━━━━━━━━━━━━\n📍 MOTO Token:\n\`${CONTRACT}\`\n\n🔗 Network: Monad (Chain ID: ${CHAIN_ID})\n🌐 Explorer: monad.socialscan.io\n━━━━━━━━━━━━━━━━━━━━`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: '🔗 View on Explorer', url: `${EXPLORER}/address/${CONTRACT}` },
          { text: '⬅️ Back', callback_data: 'back' }
        ]]
      }
    }
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `❓ *MOTO Runner Help*\n\n━━━━━━━━━━━━━━━━━━━━\n🌐 moto-runner.imperamonad.xyz\n\n*Commands:*\n/start — Main menu\n/play — Open game\n/balance — Check balance\n/claim — Claim tokens\n/leaderboard — Top riders\n/contract — Contract info\n/help — This menu\n\n*Network:* Monad #${CHAIN_ID}\n━━━━━━━━━━━━━━━━━━━━`,
    {
      parse_mode: 'Markdown',
      reply_markup: mainKeyboard
    }
  );
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const msgId = query.message.message_id;

  const edit = (text, keyboard) => {
    bot.editMessageText(text, {
      chat_id: chatId,
      message_id: msgId,
      parse_mode: 'Markdown',
      reply_markup: keyboard || mainKeyboard
    });
  };

  switch(query.data) {
    case 'back':
      const name = query.from.first_name || 'Rider';
      edit(WELCOME(name), mainKeyboard);
      break;
    case 'balance':
      edit(`💰 *MOTO Token Balance*\n\n━━━━━━━━━━━━━━━━━━━━\nConnect your wallet in the game!\n\n📍 Contract:\n\`${CONTRACT}\`\n\n🔗 Monad #${CHAIN_ID}\n━━━━━━━━━━━━━━━━━━━━`, backKeyboard);
      break;
    case 'leaderboard':
      edit(`🏆 *Top MOTO Riders*\n\n━━━━━━━━━━━━━━━━━━━━\nRace to the top and claim your glory!\n\n🥇 1st — Maximum MOTO\n🥈 2nd — High MOTO\n🥉 3rd — MOTO rewards\n━━━━━━━━━━━━━━━━━━━━`, backKeyboard);
      break;
    case 'claim':
      edit(`⛓ *Claim MOTO Tokens*\n\n━━━━━━━━━━━━━━━━━━━━\nOpen the game and claim your $MOTO!\n\n▸ Race and win\n▸ Complete levels\n▸ Top scores\n━━━━━━━━━━━━━━━━━━━━`, backKeyboard);
      break;
    case 'contract':
      edit(`📜 *Contract Info*\n\n━━━━━━━━━━━━━━━━━━━━\n\`${CONTRACT}\`\n\nMonad Chain ID: ${CHAIN_ID}\n━━━━━━━━━━━━━━━━━━━━`, {
        inline_keyboard: [[
          { text: '🔗 Explorer', url: `${EXPLORER}/address/${CONTRACT}` },
          { text: '⬅️ Back', callback_data: 'back' }
        ]]
      });
      break;
    case 'help':
      edit(`❓ *Help*\n\n━━━━━━━━━━━━━━━━━━━━\n🌐 moto-runner.imperamonad.xyz\n\n/start /play /balance /claim /leaderboard /contract /help\n\nMonad #${CHAIN_ID}\n━━━━━━━━━━━━━━━━━━━━`, mainKeyboard);
      break;
  }

  bot.answerCallbackQuery(query.id);
});

console.log('🏍 MOTO Runner Bot started - moto-runner.imperamonad.xyz');
