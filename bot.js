require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const GAME_URL = 'https://moto-76s.pages.dev';
const CONTRACT = '0xD49e4A6caEDf6e06C8E520E90518F7cDAcEbBd63';
const CHAIN_ID = 143;
const EXPLORER = 'https://monad.socialscan.io';

const mainKeyboard = {
  inline_keyboard: [
    [{ text: '🎮 PLAY MOTO RUNNER', url: GAME_URL }],
    [{ text: '💰 Balance', callback_data: 'balance' }, { text: '🏆 Leaderboard', callback_data: 'leaderboard' }],
    [{ text: '⛓ Claim MOTO', callback_data: 'claim' }, { text: '📜 Contract', callback_data: 'contract' }],
    [{ text: '❓ Help', callback_data: 'help' }, { text: '🎯 How to Play', callback_data: 'how' }]
  ]
};

const backKeyboard = {
  inline_keyboard: [[{ text: '🎮 Play Now', url: GAME_URL }, { text: '⬅️ Back', callback_data: 'back' }]]
};

const WELCOME = (name) => `
🏍 *MOTO RUNNER V2*
━━━━━━━━━━━━━━━━━━━━

Welcome, *${name}*\\!

▸ Race · Shoot · Collect · Earn
▸ Chain: Monad \\#${CHAIN_ID}
▸ Token: $MOTO

🥇 Kill enemies → Earn points & MOTO
🔫 Auto\\-fire → Shoots automatically
🪙 Collect coins → Extra rewards
✈️ Survive air strikes → Bonus score
🛡 Supply drops → Lives · Shield · Magnet

🌐 moto\\-76s\\.pages\\.dev
━━━━━━━━━━━━━━━━━━━━
Ready to ride? 👇
`;

const HOW_TO_PLAY = `
🎮 *HOW TO PLAY MOTO RUNNER V2*
━━━━━━━━━━━━━━━━━━━━

*Step 1* — Open the game link
*Step 2* — Select Character \\+ Vehicle
*Step 3* — Press ▶ START GAME
*Step 4* — Race, survive, earn\\!

*Controls:*
⬅️➡️ Arrow keys / A D — Change lane
⬆️⬇️ Arrow keys / W S — Speed up/down
🔫 Auto Fire — shoots automatically
💨 N key — NITRO boost \\(15s cooldown\\)
⏸ P key — Pause

*Enemies & Hazards:*
👾 Crypto token enemies — shoot them\\!
💣 Road obstacles — dodge or shoot
✈️ Air strikes — dodge falling bombs
🎯 Intercepting bombs = \\+30 bonus pts

*Power\\-ups \\(supply drops\\):*
❤️ \\+LIFE — extra life
🛡 SHIELD — absorbs one hit
🧲 MAGNET — attracts coins

*Scoring:*
▸ Kill enemy = \\+50 × level
▸ x3 COMBO = 2× points
▸ x5 COMBO = 3× points
▸ Shoot obstacle = \\+20 pts
▸ Intercept bomb = \\+30 pts

*Earn MOTO:*
▸ 0\\.001 MOTO per point
▸ Max 100 MOTO per run
━━━━━━━━━━━━━━━━━━━━
`;

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, WELCOME(msg.from.first_name || 'Rider'), {
    parse_mode: 'MarkdownV2',
    reply_markup: mainKeyboard
  });
});

bot.onText(/\/play/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `🎮 *Ready to ride?*\n\nOpen MOTO Runner V2 and start earning \\$MOTO\\!\n\n🌐 ${GAME_URL}`,
    { parse_mode: 'MarkdownV2', reply_markup: { inline_keyboard: [[{ text: '🏍 PLAY NOW', url: GAME_URL }]] } });
});

bot.onText(/\/balance/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `💰 *MOTO Token Balance*\n\n━━━━━━━━━━━━━━━━━━━━\nConnect your wallet in the game\\!\n\n📍 Contract:\n\`${CONTRACT}\`\n\n🔗 Network: Monad \\#${CHAIN_ID}\n━━━━━━━━━━━━━━━━━━━━`,
    { parse_mode: 'MarkdownV2', reply_markup: backKeyboard });
});

bot.onText(/\/claim/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `⛓ *Claim MOTO Tokens*\n\n━━━━━━━━━━━━━━━━━━━━\nOpen the game, connect wallet and sign your score\\!\n\n▸ 0\\.001 MOTO per point\n▸ Max 100 MOTO per run\n▸ Kill enemies · Collect coins\n━━━━━━━━━━━━━━━━━━━━`,
    { parse_mode: 'MarkdownV2', reply_markup: backKeyboard });
});

bot.onText(/\/leaderboard/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `🏆 *Top MOTO Riders*\n\n━━━━━━━━━━━━━━━━━━━━\nRace to the top and claim your glory\\!\n\n🥇 1st — Maximum MOTO\n🥈 2nd — High MOTO\n🥉 3rd — MOTO rewards\n━━━━━━━━━━━━━━━━━━━━`,
    { parse_mode: 'MarkdownV2', reply_markup: backKeyboard });
});

bot.onText(/\/contract/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `📜 *Contract Info*\n\n━━━━━━━━━━━━━━━━━━━━\n📍 MOTO Token:\n\`${CONTRACT}\`\n\n🔗 Network: Monad \\(Chain ID: ${CHAIN_ID}\\)\n💎 rewardPerPoint: 0\\.001 MOTO\n🎯 maxClaimPerGame: 100 MOTO\n━━━━━━━━━━━━━━━━━━━━`,
    { parse_mode: 'MarkdownV2', reply_markup: { inline_keyboard: [[{ text: '🔗 Explorer', url: `${EXPLORER}/address/${CONTRACT}` }, { text: '⬅️ Back', callback_data: 'back' }]] } });
});

bot.onText(/\/how/, (msg) => {
  bot.sendMessage(msg.chat.id, HOW_TO_PLAY, { parse_mode: 'MarkdownV2', reply_markup: backKeyboard });
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `❓ *MOTO Runner Help*\n\n━━━━━━━━━━━━━━━━━━━━\n🌐 moto\\-76s\\.pages\\.dev\n\n*Commands:*\n/start — Main menu\n/play — Open game\n/balance — Check balance\n/claim — Claim tokens\n/leaderboard — Top riders\n/contract — Contract info\n/how — How to play\n/help — This menu\n\n*Network:* Monad \\#${CHAIN_ID}\n━━━━━━━━━━━━━━━━━━━━`,
    { parse_mode: 'MarkdownV2', reply_markup: mainKeyboard });
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const msgId  = query.message.message_id;
  const name   = query.from.first_name || 'Rider';

  const edit = (text, keyboard, md = 'MarkdownV2') =>
    bot.editMessageText(text, {
      chat_id: chatId, message_id: msgId,
      parse_mode: md, reply_markup: keyboard || mainKeyboard
    }).catch(() => {});

  switch (query.data) {
    case 'back':
      edit(WELCOME(name), mainKeyboard);
      break;
    case 'balance':
      edit(`💰 *MOTO Balance*\n\n━━━━━━━━━━━━━━━━━━━━\nConnect wallet in game\\!\n\n\`${CONTRACT}\`\n\nMonad \\#${CHAIN_ID}\n━━━━━━━━━━━━━━━━━━━━`, backKeyboard);
      break;
    case 'leaderboard':
      edit(`🏆 *Top Riders*\n\n━━━━━━━━━━━━━━━━━━━━\n🥇 1st — Max MOTO\n🥈 2nd — High MOTO\n🥉 3rd — MOTO\n\n🎮 ${GAME_URL}\n━━━━━━━━━━━━━━━━━━━━`, backKeyboard);
      break;
    case 'claim':
      edit(`⛓ *Claim MOTO*\n\n━━━━━━━━━━━━━━━━━━━━\nSign your score in game\\!\n\n▸ 0\\.001 MOTO/point\n▸ Max 100 MOTO/run\n━━━━━━━━━━━━━━━━━━━━`, backKeyboard);
      break;
    case 'contract':
      edit(`📜 *Contract*\n\n━━━━━━━━━━━━━━━━━━━━\n\`${CONTRACT}\`\n\nMonad \\#${CHAIN_ID}\n━━━━━━━━━━━━━━━━━━━━`,
        { inline_keyboard: [[{ text: '🔗 Explorer', url: `${EXPLORER}/address/${CONTRACT}` }, { text: '⬅️ Back', callback_data: 'back' }]] });
      break;
    case 'how':
      edit(HOW_TO_PLAY, backKeyboard);
      break;
    case 'help':
      edit(`❓ *Help*\n\n/start /play /balance /claim /leaderboard /contract /how /help\n\nMonad \\#${CHAIN_ID}\n━━━━━━━━━━━━━━━━━━━━`, mainKeyboard);
      break;
  }
  bot.answerCallbackQuery(query.id);
});

console.log('🏍 MOTO Runner Bot V2 started - moto-76s.pages.dev');

const http = require('http');
http.createServer((req, res) => res.end('OK')).listen(process.env.PORT || 3000);
