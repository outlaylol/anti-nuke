module.exports.run = async (client, msg, args) => {
    if(msg.guild.ownerID !== msg.author.id) {
    if (!client.antinuke.get(msg.guild.id, "trusted").includes(msg.author.id)) return msg.reply('Only trusted users may use this command.')
  }

    client.antinuke.set(msg.guild.id, [], "restore.0.channels")
    client.antinuke.set(msg.guild.id, [], "restore.0.roles")
    let channels = msg.guild.channels.array()
    let roles = msg.guild.roles
    for(let i = 0; i < channels.length; i++) {


      
        if (!channels[i].parent) {
          client.antinuke.push(msg.guild.id, { name: channels[i].name, position: channels[i].position, type: channels[i].type, }, "restore.0.channels")
        } else if(channels[i].parent) {
          client.antinuke.push(msg.guild.id, { name: channels[i].name, position: channels[i].position, type: channels[i].type, parent: channels[i].parent.name }, "restore.0.channels")
        }
    }

    roles.forEach(r => {

        client.antinuke.push(msg.guild.id, { name: r.name, position: r.position, permissions: r.permissions, color: r.color }, "restore.0.roles")
       
    })


    client.antinuke.set(msg.guild.id, Date.now(), "restore.0.made")
    msg.channel.send('Done, everything was backed up.')
}
