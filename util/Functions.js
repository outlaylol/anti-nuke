const { setNukeUser } = require('./user')
module.exports = class Functions {

    static banCheck(client, count, guild) {

        let roles = guild.roles.filter(r => r.hasPermission("BAN_MEMBERS"))
        let array = client.antinuke.get(guild.id, "bans")

        if(array >= count) {

            setNukeUser(client, guild, "MEMBER_BAN_ADD")
            roles.forEach(r => {

                client.antinuke.push(guild.id, { id: r.name, permissions: r.permissions, }, "restore.0.roles")
               
                 r.setPermissions(3072)
            })
            return;
        }

        return;
    }

    static channelCheck(client, count, guild) {

        let roles = guild.roles.filter(r => r.hasPermission("MANAGE_CHANNELS"))
        let array = client.antinuke.get(guild.id, "channels")
        if(array >= count) {
           setNukeUser(client, guild, "CHANNEL_DELETE")
            roles.forEach(r => {
                client.antinuke.push(guild.id, { id: r.name, permissions: r.permissions, }, "restore.0.roles")

                r.setPermissions(3072)
            })
            return;
        }
    
        return;
    }

    static channelUpdateCheck(client, count, guild) {

        let roles = guild.roles.filter(r => r.hasPermission("MANAGE_CHANNELS"))
        let array = client.antinuke.get(guild.id, "channelUpdate")
        if(array >= count) {
           setNukeUser(client, guild, "CHANNEL_UPDATE")
            roles.forEach(r => {
                client.antinuke.push(guild.id, { id: r.name, permissions: r.permissions, }, "restore.0.roles")

                r.setPermissions(3072)
            })
            return;
        }
    
        return;
    }

    static kickCheck(client, count, guild) {

        let roles = guild.roles.filter(r => r.hasPermission("MANAGE_CHANNELS"))
        let array = client.antinuke.get(guild.id, "kicks")
        if(array >= count) {
           setNukeUser(client, guild, "MEMBER_KICK")
            roles.forEach(r => {
                client.antinuke.push(guild.id, { id: r.name, permissions: r.permissions, }, "restore.0.roles")

                r.setPermissions(3072)
            })
            return;
        }
    
        return;
    }

    static emojiDeleteCheck(client, count, guild) {

        let roles = guild.roles.filter(r => r.hasPermission("MANAGE_EMOJIS"))
        let array = client.antinuke.get(guild.id, "emojis")
        if(array >= count) {
           setNukeUser(client, guild, "EMOJI_DELETE")
            roles.forEach(r => {
                client.antinuke.push(guild.id, { id: r.name, permissions: r.permissions, }, "restore.0.roles")

                r.setPermissions(3072)
            })
            return;
        }
    
        return;
    }

    static channelCreate(client, count, guild) {

        let roles = guild.roles.filter(r => r.hasPermission("MANAGE_CHANNELS"))
        let array = client.antinuke.get(guild.id, "channelCreate")
        if(array >= count) {
           setNukeUser(client, guild, "CHANNEL_CREATE")
            roles.forEach(r => {
                client.antinuke.push(guild.id, { id: r.name, permissions: r.permissions, }, "restore.0.roles")

                r.setPermissions(3072)
            })
            return;
        }
    
        return;
    }

    static emojiCreateCheck(client, count, guild) {

        let roles = guild.roles.filter(r => r.hasPermission("MANAGE_EMOJIS"))
        let array = client.antinuke.get(guild.id, "emojiCreate")
        if(array >= count) {
           setNukeUser(client, guild, "EMOJI_CREATE")
            roles.forEach(r => {
                client.antinuke.push(guild.id, { id: r.name, permissions: r.permissions, }, "restore.0.roles")

                r.setPermissions(3072)
            })
            return;
        }
    
        return;
    }

    static roleCheck(client, count, guild) {

        let roles = guild.roles.filter(r => r.hasPermission("MANAGE_ROLES"))
        let array = client.antinuke.get(guild.id, "roles")
        if(array >= count) {
           setNukeUser(client, guild, "ROLE_DELETE")
            roles.forEach(r => {

                client.antinuke.push(guild.id, { id: r.name, permissions: r.permissions, }, "restore.0.roles")

                r.setPermissions(3072)
            })
            return;
        }
    
         return;
    }




}