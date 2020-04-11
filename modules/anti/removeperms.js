module.exports.run = async (client, msg, args) => {
    if(msg.guild.ownerID !== msg.author.id) {
      if (!client.antinuke.get(msg.guild.id, "trusted").includes(msg.author.id)) return msg.reply('Only trusted users may use this command.')
    }
  
    let roles = msg.guild.roles.filter(r => r.hasPermission("BAN_MEMBERS"))

    roles.forEach(r => r.setPermissions(1024))

    msg.channel.send('Done.')
  }