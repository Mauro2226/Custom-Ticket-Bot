const discord = require('discord.js')
const config = require('./config.json')
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.GuildEmojisAndStickers
    ],
    partials:[discord.Partials.Channel,discord.Partials.GuildMember,discord.Partials.User]
});
exports.client = client

client.on('ready', () => {
    console.log(config.message.bot_ready)
})

const ticket_open = require("./commands/ticket_open")
ticket_open();

const ticke_management = require("./commands/ticket_management")
ticke_management();

const delete_ticket = require("./commands/delete_ticket")
delete_ticket();

const ticket_transcript = require("./commands/ticket_transcript")
ticket_transcript();

client.login(config.token)