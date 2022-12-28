const discord = require('discord.js')
const bot = require('../ticket')
const client = bot.client
const config = require("../config.json")

module.exports = () => {
    client.on("interactionCreate" , interaction => {
        if(interaction.customId == 'transcript'){
            if(interaction.member.roles.cache.has(config.bot_permission_role)){
                interaction.deferUpdate();
                let user_transcript = interaction.user.username;
                interaction.channel.messages.fetch().then(messages => {
                    var array_transcript = []
                    messages.forEach(msg => {
                        if(interaction.user.id != client.user.id){
                            if(msg.author.id != config.client_id){
                                if(msg.content != "Object"){
                                    array_transcript.push(msg.author.username+": "+msg.content)
                                }
                            }
                        }
                    })
                    var transcript = array_transcript.reverse().join("\n")
                    let splitted_transcript = [transcript.slice(0,2000)]
                    if(transcript.length > 4000){
                        splitted_transcript.push(transcript.slice(2000,4000))
                        splitted_transcript.push(transcript.slice(4000))
                    }else if(transcript.length > 2000){
                        splitted_transcript.push(transcript.slice(2000))
                    }

                    var embed_transcript = new discord.EmbedBuilder()
                        .setColor(config.message.embed_transcript.color)
                        .setTitle(config.message.embed_transcript.title)
                        .setDescription(config.message.embed_transcript.creatd_by_message+user_transcript+"\n"+splitted_transcript[0])
                        .setTimestamp()

                    interaction.guild.channels.cache.find(ch => ch.id == config.log_category).send({embeds:[embed_transcript]})

                })
            }else{
                interaction.reply({content:config.message.no_permission,ephemeral:true})
            }
        }
    })
}