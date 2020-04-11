module.exports.run = async (client, msg, args) => {

    if(msg.guild.ownerID !== msg.author.id) {
        if (!client.antinuke.get(msg.guild.id, "trusted").includes(msg.author.id)) return msg.reply('Only trusted users may use this command.')
      }
    

    if(client.antiraid.get(msg.guild.id, "botsystem")) {
       client.antiraid.set(msg.guild.id, false, "botsystem") 
        return msg.reply('Turned off bot system.') 
    }

    msg.reply('Turned on trust system.')
    client.antiraid.set(msg.guild.id, true, "botsystem")

}