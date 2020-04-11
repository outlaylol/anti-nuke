module.exports.run = async (client, msg, args) => {

    if(msg.guild.ownerID !== msg.author.id) return msg.reply('You are not the owner, you are not allowed to trust people.')

    let user = msg.mentions.users.first() 
    if (!user) return msg.reply('you forgot to mention a user to trust.')

    if(client.antinuke.get(msg.guild.id, "trusted").includes(user.id)) {
       client.antinuke.delete(msg.guild.id, `trusted.${client.antinuke.get(msg.guild.id, "trusted").findIndex(obj => obj === user.id)}`) 
        return msg.reply('That user had already been trusted so I deleted them from using commands.') 
    }

    msg.reply('Added user to trusted users.')
    client.antinuke.push(msg.guild.id, user.id, "trusted")

}