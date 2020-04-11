module.exports.run = async (client, msg, args) => {
    if(msg.guild.ownerID !== msg.author.id) {
      if (!client.antinuke.get(msg.guild.id, "trusted").includes(msg.author.id)) return msg.reply('Only trusted users may use this command.')
    }
  
  
      let roles = client.antinuke.get(msg.guild.id, "restore.0.roles")




        for (let i = 0; i < roles.length; i++) {
            if(!msg.guild.roles.find(r => r.name === roles[i].id)) continue;
            client.antinuke.delete(msg.guild.id, `restore.0.roles.${i}`)
            msg.guild.roles.find(r => r.name === roles[i].id).setPermissions(roles[i].permissions)
        }
        await msg.channel.send('Done, fixed admin roles.')
  
  }