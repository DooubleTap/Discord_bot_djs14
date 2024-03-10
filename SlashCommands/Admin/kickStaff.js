const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const {
  staffRole,
  supportRole,
  moderatorRole,
  adminRole,
  secretaireRole,
  devRole,
  fondaRole,
} = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kickstaff")
    .setDescription("Kick un membre du staff de l'equipe (Admin-Only)")
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
    const adminRoleMention = `<@&${adminRole}>`;
    if (!target)
      return await interaction.reply({
        content: "Je ne trouve pas ce user",
        ephemeral: true,
      });
    if (!interaction.member.roles.cache.has(fondaRole))
      return await interaction.reply({
        content: `Tu doit etre ${adminRoleMention} pour faire cette action`,
        ephemeral: true,
      });
    await interaction.deferReply();
    try {
      await target.roles.remove(staffRole);
      await target.roles.remove(supportRole);
      await target.roles.remove(moderatorRole);
      await target.roles.remove(secretaireRole);
      await target.roles.remove(adminRole);
      await target.roles.remove(devRole);

      await interaction.editReply({
        content: `${target.user} été retiré du ${staffRoleMention}! \nBye! :broken_heart:`,
      });
    } catch (e) {
      console.log(e);
      await interaction.editReply({
        content: `Jai eu un problème, ${e.message}`,
      });
    }
  },
};
