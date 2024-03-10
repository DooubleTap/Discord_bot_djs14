const { discord, ActivityType } = require("discord.js");


module.exports = {
  name: "ready",
  run: async (c) => {
    console.log(`⌛ ${c.user.tag} démarre...`);
    console.log(`✅ ${c.user.tag} a démarré!`);
    c.user.setActivity({
      name: "Je beep et je boop!",
      type: ActivityType.Custom,
    });

    c.on('guildCreate', async (guild) => {
      console.log("Joined a new guild: " + guild.name);
      try {
        await guild.members.fetch();
        const guildOwner = guild.members.cache.find(member => member.user.id === guild.ownerId);
        const guildName = guild.name;
        const ownerName = guildOwner?.user.username;
        const memberCount = guild.memberCount;
        const channelCount = guild.channels.cache.size;
        const roleList = guild.roles.cache.filter(role => role.name !== '@everyone').map(role => role.name);
        const productionGuild = await c.guilds.fetch('1142125855737397299');
        const channel = productionGuild.channels.cache.get('1148325206490894416');
        
        await channel.send(`New guild joined!\n\nGuild Name: ${guildName}\nOwner: ${ownerName}\nMembers: ${memberCount}\nChannels: ${channelCount}\n List of Roles: ${roleList.join(',')}`);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });

    c.on("guildDelete", guild => {
        console.log("Left a guild: " + guild.name);
    })

  },
};