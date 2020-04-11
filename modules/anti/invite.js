module.exports.run = async (client, msg, args) => {

    msg.channel.send(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)

    
}