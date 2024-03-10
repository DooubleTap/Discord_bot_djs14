const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

/**
 * Formats a timestamp.
 *
 * @param {number} time - The timestamp in milliseconds.
 * @param {import('discord.js').TimestampStylesString} style - The timestamp style.
 * @returns {string} - The formatted timestamp.
 */
const time = (time, style) => {
    return `<t:${Math.floor(time / 1000)}${style ? `:${style}` : ""}>`;
  };

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Regarde les informations public d\'un compte')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('Le compte a vérifier')
                .setRequired(false)
        ),
    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute: async (client, interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        const targetUser = interaction.options.getUser('user');
        const avatarURL = targetUser.displayAvatarURL({ dynamic: true });

        if (!member) {
            await interaction.reply({
                content: 'Le nom me dit rien'
            });

            return;
        };

        const roles = [];
        
        if (member.roles) member.roles.cache.forEach((role) => {
            if (role.id !== interaction.guild.roles.everyone.id) roles.push(`${role.toString()}`);
        });

        const arr = [
            `**Nickname**: <@${user.id}>`,
            `**Username**: ${user.username}`,
            `**ID**: ${user.id}`,
            `\n**Création du compte**: ${time(user.createdTimestamp, 'd')} (${time(user.createdTimestamp, 'R')})`,
            `**Rejoin le serveur**: ${time(member.joinedTimestamp, 'd')} (${time(member.joinedTimestamp, 'R')})`,
            `\n**Roles** [${member.roles?.cache?.size - 1}]: ${roles.join(', ')}`,
            /* `**Dans un channel vocal?**: ${member.voice ? 'Yes' : 'No'}`, */
            `**Timeout ou mute?**: ${member.communicationDisabledUntilTimestamp ? 'Yes' : 'No'}`,
        ];

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('/userinfo - ' + user.username)
                    .setThumbnail(member.displayAvatarURL())
                    .setDescription(`${arr.join('\n')}`)
                    .setColor('Green')
            ],
            ephemeral: true
        });
    },
};