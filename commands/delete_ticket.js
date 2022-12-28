const discord = require('discord.js')
const bot = require('../ticket')
const client = bot.client
const config = require("../config.json")

module.exports = () => {
    client.on("interactionCreate",(interaction) => {
        if(interaction.customId == 'delete'){
            if(interaction.member.roles.cache.has(config.bot_permission_role)){
                interaction.deferUpdate();
                let name = interaction.channel.name;
                let author = interaction.user.username;
                let embed_delete = new discord.EmbedBuilder()
                    .setTitle(config.message.embed_delete.title)
                    .setDescription(config.message.embed_delete.eliminated_ticket_message+name+"\n"+config.message.embed_delete.eliminated_by_message+author)
                    .setTimestamp()
                    .setColor(config.message.embed_delete.color)
                interaction.guild.channels.cache.find(ch => ch.id == config.log_category).send({embeds:[embed_delete]})
                interaction.channel.delete();
            }else{
                interaction.reply({content:config.message.no_permission,ephemeral:true})
            }
        }
    })
}