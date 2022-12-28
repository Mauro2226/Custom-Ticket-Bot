const discord = require('discord.js')
const bot = require('../ticket')
const client = bot.client
const config = require("../config.json")
const { ButtonStyle } = require('discord.js')

module.exports = () => {
    client.on("messageCreate", (msg) => {
        if(msg.content == config.prefix+"ticket" && msg.member.roles.cache.has(config.bot_permission_role)){
            msg.delete();
            var embed_open_ticket = new discord.EmbedBuilder()
            .setTitle(config.message.embed_open_ticket.title)
            .setDescription(config.message.embed_open_ticket.description)
            .setColor(config.message.embed_open_ticket.color)

            var button_open_ticket = new discord.ButtonBuilder()
            .setEmoji(config.message.embed_open_ticket.emoji_button)
            .setCustomId('open')
            if(config.message.embed_open_ticket.button_style == 1){
                button_open_ticket.setStyle(ButtonStyle.Primary)
            }else if (config.message.embed_open_ticket.button_style == 2){
                button_open_ticket.setStyle(ButtonStyle.Secondary)
            }else if(config.message.embed_open_ticket.button_style == 3){
                button_open_ticket.setStyle(ButtonStyle.Success)
            }else if(config.message.embed_open_ticket.button_style == 4){
                button_open_ticket.setStyle(ButtonStyle.Danger)
            }else{
                button_open_ticket.setStyle(ButtonStyle.Primary)
            }

            var row = new discord.ActionRowBuilder()
            .addComponents(button_open_ticket)

            msg.channel.send({embeds:[embed_open_ticket],components:[row]})
        }
    })
}