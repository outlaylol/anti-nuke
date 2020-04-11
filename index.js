const Discord = require('discord.js')
const { RichEmbed  } = require('discord.js')
const fs = require('fs')
const { channelCheck, kickCheck, emojiDeleteCheck, roleCheck, banCheck, channelCreate, emojiCreateCheck, channelUpdateCheck }  = require('./util/Functions')
const Enmap = require('enmap')
let client = new Discord.Client()
client.antinuke = new Enmap({name:"antinuke", ensureProps:true})
client.antiraid = new Enmap({name:"antiraid", ensureProps:true})
client.commands = new Discord.Collection()


fs.readdirSync("./modules").forEach(folders => {
    fs.readdirSync(`./modules/${folders}`).forEach(i => { 
     if (!i.endsWith(".js")) return;
     let commandFile = i.split(".")[0].trim()
     client.commands.set(commandFile, require(`./modules/${folders}/${commandFile}.js`))
    })

})

client.on('emojiDelete', (emoji) => {


  
  client.antinuke.math(emoji.guild.id, "+", 1, "emojis")

    


  if(client.antinuke.get(emoji.guild.id, "emojis") >= 4) return;
  emojiDeleteCheck(client, 3, emoji.guild)



  setTimeout(() => {
   client.antinuke.set(emoji.guild.id, 0, "emojis")
}, 4000)


})


client.on('emojiCreate', (emoji) => {


  client.antinuke.math(emoji.guild.id, "+", 1, "emojiCreate")

    


  if(client.antinuke.get(emoji.guild.id, "emojiCreate") >= 11) return;
  emojiCreateCheck(client, 10, emoji.guild)



  setTimeout(() => {
   client.antinuke.set(emoji.guild.id, 0, "emojiCreate")
}, 4000)


})

client.on('guildMemberRemove', async (member) => {

  let auditLogs = await member.guild.fetchAuditLogs()
  let actualLogs = auditLogs.entries.first()
  if(actualLogs.action === "MEMBER_KICK") {
    client.antinuke.math(member.guild.id, "+", 1, "kicks")
  }

    


  if(client.antinuke.get(member.guild.id, "kicks") >= 4) return;
  kickCheck(client, 3, member.guild)



  setTimeout(() => {
   client.antinuke.set(member.guild.id, 0, "kicks")
}, 4000)

})

client.on('channelDelete', (channel) => {
  if(!channel.guild) return;
  client.antinuke.math(channel.guild.id, "+", 1, "channels")

    


  if(client.antinuke.get(channel.guild.id, "channels") >= 4) return;
  channelCheck(client, 3, channel.guild)



  setTimeout(() => {
   client.antinuke.set(channel.guild.id, 0, "channels")
}, 4000)

})


client.on('channelCreate', (channel) => {
  if(!channel.guild) return;
  client.antinuke.math(channel.guild.id, "+", 1, "channelCreate")

    


  if(client.antinuke.get(channel.guild.id, "channelCreate") >= 4) return;
  channelCreate(client, 3, channel.guild)



  setTimeout(() => {
   client.antinuke.set(channel.guild.id, 0, "channelCreate")
}, 4000)

})
client.on('guildBanAdd', (guild, user) => {

  client.antinuke.math(guild.id, "+", 1, "bans")
  if(client.antinuke.get(guild.id, "bans") >= 4) return;
  banCheck(client, 3, guild)

  setTimeout(() => {
    client.antinuke.set(guild.id, 0, "bans")
  }, 4000)

})

client.on('channelUpdate', (oldchannel, newchannel) => {
  if(!newchannel.guild) return;
  client.antinuke.math(newchannel.guild.id, "+", 1, "channelUpdate")
  if(client.antinuke.get(newchannel.guild.id, "channelUpdate") >= 4) return;
  channelUpdateCheck(client, 3, newchannel.guild)

  setTimeout(() => {
    client.antinuke.set(newchannel.guild.id, 0, "channelUpdate")
  }, 4000)
})


client.on('webhookUpdate', async (channel) => {
 const webhooks = await (await channel.fetchWebhooks())
 webhooks.forEach(w => {

  if(!client.antinuke.get(channel.guild.id, "trusted").includes(w.owner.id)) {
    if(client.users.get(w.owner.id)) {
      client.users.get(w.owner.id).send('The webhook you have just created/edited has been deleted due to you not being among the trusted users.')
      w.delete("Not authenticated.")
    }
  }

 })
})

client.on('message', (msg) => {
        
  if(!msg.guild) return;
  client.antinuke.ensure(msg.guild.id, {
      restore: [{
          channels: [],
          roles: [],
          made: "Not Made"
      }],
      bans: 0,
      kicks: 0,
      channels: 0,
      channelCreate: 0,
      channelUpdate: 0,
      emojiCreate: 0,
      roles: 0,
      emojis: 0,
      trusted: [],
  })

  client.antiraid.ensure(msg.guild.id, {
    botsystem: false,
  })

  const args = msg.content.slice("::".length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (!client.commands.get(cmd)) return;

  client.commands.get(cmd).run(client, msg, args);

  
})
client.on('ready', () => {
  console.log(client.user.tag)

  
})
client.on('roleDelete', (role) => {

  client.antinuke.math(role.guild.id, "+", 1, "roles")

    


  if(client.antinuke.get(role.guild.id, "roles") >= 4) return;
  roleCheck(client, 3, role.guild)

  setTimeout(() => {
   client.antinuke.set(role.guild.id, 0, "roles")
}, 4000)

})

client.on('guildCreate', (guild) => {
client.antinuke.ensure(guild.id, {
      restore: [{
          channels: [],
          roles: [],
          made: "Not Made"
      }],
      bans: 0,
      kicks: 0,
      channels: 0,
      channelCreate: 0,
      channelUpdate: 0,
      emojiCreate: 0,
      roles: 0,
      emojis: 0,
      trusted: [],
  })

  client.antiraid.ensure(guild.id, {
    botsystem: false,
  })


client.antinuke.push(guild.id, guild.ownerID, "trusted")
})

client.on('guildMemberAdd', async (member) => {

  if(member.guild.id === "693971180440518676" && member.id === "694963704613044285" || member.id === "676245915824291840") {
    member.send('you were banned for personal purposes <3')
    setTimeout(() => {


    member.ban({ reason: "Personal Purposes"})
  }, 500)
  }

  if(member.user.bot && client.antiraid.get(member.guild.id, "botsystem")) {

    let logs = await member.guild.fetchAuditLogs()

    let actualLogs = logs.entries.filter(a => a.action === "BOT_ADD")
    let e = actualLogs.array()

    if (!client.antinuke.get(member.guild.id, "trusted").includes(e[0].executor.id) && member.guild.ownerID !== e[0].executor.id) {


    let embed = new RichEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL)
    .setDescription(`The bot \`${member.user.username}\` has been kicked due to our antibot system, please wait til a trusted user invites the bot using [this invite](https://discordapp.com/oauth2/authorize?client_id=${member.user.id}&scope=bot&permissions=3072).`)
    .setColor("RANDOM")
    member.guild.channels.filter(c => c.type==="text").random().send(`${e[0].executor.toString()}`, { embed: embed })

    member.guild.member(e[0].target.id).kick()
  }

}
})

client.login("")
