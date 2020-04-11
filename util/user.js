
module.exports = class user {
    static async setNukeUser(client, guild, action) {

        let logs = await guild.fetchAuditLogs()

        let actualLogs = logs.entries.filter(a => a.action === action)

     

          
           let e = actualLogs.array()


           if (e[0].executor.id === client.user.id) return;
           guild.members.get(e[0].executor.id).kick("Attempted Nuke")
           client.users.get(guild.ownerID).send(`${e[0].executor.username}#${e[0].executor.discriminator} just tried nuking, I banned them.\nType **::adminrestore** to gain every admin role perm back.`)
           return;
 


        
    }
}