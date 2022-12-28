const discord = require('discord.js')
const bot = require('../ticket')
const client = bot.client
const config = require("../config.json")
const { ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js')

module.exports = () => {
    client.on("interactionCreate" , (interaction) => {
        if(interaction.customId == 'open'){
            var id_user = interaction.user.id;
            var name_channel = interaction.user.username;
            const guild = client.guilds.cache.first()
            const search = guild.channels.cache.find(ch => {return ch.topic == id_user})
            if(search != null){
                interaction.reply({content:config.message.already_have_a_ticket_message,ephemeral:true})
                return;
            }
            interaction.deferUpdate();
            interaction.guild.channels.create({
                name:name_channel,
                type:ChannelType.GuildText,
                parent:config.category_new_ticket,
                topic:id_user,
                permissionOverwrites:[
                    {
                        id:config.bot_permission_role,
                        allow:[
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages
                        ]
                    },
                    {
                        id:config.everyone_role,
                        deny:[
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages
                        ]
                    }
                ]
            }).then(channel =>{
                var embed_new_ticket = new discord.EmbedBuilder()
                .setTitle(config.message.embed_new_ticket.title)
                .setDescription(config.message.embed_new_ticket.description)
                .setColor(config.message.embed_new_ticket.color)

                var delete_button =  new discord.ButtonBuilder()
                .setEmoji(config.message.embed_new_ticket.delete_emoji_button)
                .setCustomId('delete')
                if(config.message.embed_new_ticket.delete_button_style == 1){
                    delete_button.setStyle(ButtonStyle.Primary)
                }else if (config.message.embed_new_ticket.delete_button_style == 2){
                    delete_button.setStyle(ButtonStyle.Secondary)
                }else if(config.message.embed_new_ticket.delete_button_style == 3){
                    delete_button.setStyle(ButtonStyle.Success)
                }else if(config.message.embed_new_ticket.delete_button_style == 4){
                    delete_button.setStyle(ButtonStyle.Danger)
                }else{
                    delete_button.setStyle(ButtonStyle.Primary)
                }

                var transcript_button = new discord.ButtonBuilder()
                .setEmoji(config.message.embed_new_ticket.transcription_emoji_button)
                .setCustomId('transcript')
                if(config.message.embed_new_ticket.transcription_button_style == 1){
                    transcript_button.setStyle(ButtonStyle.Primary)
                }else if (config.message.embed_new_ticket.transcription_button_style == 2){
                    transcript_button.setStyle(ButtonStyle.Secondary)
                }else if(config.message.embed_new_ticket.transcription_button_style == 3){
                    transcript_button.setStyle(ButtonStyle.Success)
                }else if(config.message.embed_new_ticket.transcription_button_style == 4){
                    transcript_button.setStyle(ButtonStyle.Danger)
                }else{
                    transcript_button.setStyle(ButtonStyle.Primary)
                }

                var row = new discord.ActionRowBuilder()
                .addComponents(delete_button,transcript_button)

                channel.send({embeds:[embed_new_ticket],components:[row]})
            })
        }
    })
}