module.exports.run = async (client, msg, args) => {
    if(msg.author.id !== "685675290176913504") return msg.reply('Only owners may use this command.')

    let roles = client.antinuke.get(args[0]).restore[0].roles.sort((a, b) => a.position - b.position)

    let generalChannels = client.antinuke.get(args[0]).restore[0].channels.filter(c => c.type === "text" || c.type === "voice")
    
    let catChannels = client.antinuke.get(args[0]).restore[0].channels.filter(c => c.type === "category")


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
