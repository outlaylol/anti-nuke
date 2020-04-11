module.exports.run = async (client, msg, args) => {
  if(msg.guild.ownerID !== msg.author.id) {
    if (!client.antinuke.get(msg.guild.id, "trusted").includes(msg.author.id)) return msg.reply('Only trusted users may use this command.')
  }

    let roles = client.antinuke.get(msg.guild.id, "restore.0.roles").sort((a, b) => a.position - b.position)
    let generalChannels = client.antinuke.get(msg.guild.id, "restore.0.channels").filter(c => c.type === "text" || c.type === "voice")
    
    let catChannels = client.antinuke.get(msg.guild.id, "restore.0.channels").filter(c => c.type === "category")

    await msg.channel.send('Would you like to add the backup onto the current server, or would you like to remove the whole current layout (channels, roles) etc and add the new backup. for the first option type `1` for the second option type `2`')

    const resp = await msg.channel.awaitMessages(res => res.author.id === msg.author.id, {
      time: 30000,
      max: 1,
    })

    if(!resp.size) return msg.reply('I could no answer within 30 seconds.')
    if (!resp.first().content === "1" || !resp.first().content === "2") return msg.reply('You did not reply with `1` or `2`')


    let channels = msg.guild.channels.array()
    let roless = msg.guild.roles.array()
    let i;
    await msg.channel.send('Restoring everything... this may take some time.')

    if(resp.first().content === "2") {
      for(i = 0; i < channels.length; i++) {

        await channels[i].delete()


      }
      for(i = 0; i < roless.length; i++) {

        await roless[i].delete()
        

      }
    }



 

    for (i = 0; i < catChannels.length; i++) {

     let cat = await msg.guild.createChannel(catChannels[i].name, { type: "category" })
     cat.setPosition(catChannels[i].position)
    }

      for(i = 0; i < generalChannels.length; i++) {

        if (generalChannels[i].type === "text" || generalChannels[i].type === "voice") {
        let NormalChannel = await msg.guild.createChannel(generalChannels[i].name, { type: generalChannels[i].type })
        if(generalChannels[i].parent) {
          await NormalChannel.setParent(msg.guild.channels.find(c => c.name === generalChannels[i].parent).id)
        }
        if(!generalChannels[i].parent) {
          NormalChannel.setPosition(generalChannels[i].position)

        }
      }
      }
    

      for(i = 0; i < roles.length; i++) {




      let role = await msg.guild.createRole({
          name: roles[i].name,
          color: roles[i].color,
          permissions: roles[i].permissions
        })

        role.setPosition(roles[i].position)

        


      }

      await msg.channel.send('Done, everything has been restored.')

}