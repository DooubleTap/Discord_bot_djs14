const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const { adminRole, supportRole, staffRole } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addstaff")
    .setDescription("Ajoute un citoyen comme membre du staff (Admin-Only")
    .addUserOption((option) => {
      option
        .setName("target")
        .setDescription("Le user a ajouté")
        .setRequired(true);
      return option;
    }),
  /**
   *
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  execute: async (client, interaction) => {
    const { member, options } = interaction;
    const target = options.getMember("target");
    const staffRoleMention = `<@&${staffRole}>`;
    const supportRoleMention = `<@&${supportRole}>`;
    if (!target)
      return await interaction.reply({
        content: "Je ne trouve pas ce user",
        ephemeral: true,
      });
    if (!interaction.member.roles.cache.has(adminRole))
      return await interaction.reply({
        content: "Tu doit etre Admin pour faire cette action",
        ephemeral: true,
      });
    await interaction.deferReply();
    try {
      await target.roles.add(staffRole);
      await target.roles.add(supportRole);

      await interaction.editReply({
        content: `${target.user} a recu les roles ${staffRoleMention} et ${supportRoleMention}! \nBienvenu dans l'équipe! :green_heart:`,
      });
    } catch (e) {
      console.log(e);
      await interaction.editReply({
        content: `Jai eu un problème, ${e.message}`,
      });
    }
  },
};
