const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const { citoyen, immigrant, staffRole } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("douane") /* Le nom de la commande */
    .setDescription("Trouve le citoyen dans la liste, ou ajoute le Client ID")
    .addUserOption((option) => {
      option
        .setName("target")
        .setDescription("Si vous ne le trouvez pas, ajoutez le Client ID")
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
    if (!target)
      return await interaction.deferReply({
        content: "Je ne trouve pas le membre",
        ephemeral: true,
      });
    if (!interaction.member.roles.cache.has(staffRole)) /* Le role requis pour tapper la commande qui modifie les roles a la ligne 45 et 46 */
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `⛔ Vous devez etre staff pour utiliser cette commande`
            )
            .setColor("#fc0303"),
        ],
      });
    await interaction.deferReply();
    try {
      await target.roles.add(citoyen); /* Le role a donner au client */
      await target.roles.remove(immigrant); /* Le role a retirer immediatement après avoir remis le role au dessu */
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${target.user} a recu sa douane! 🎉`)
            .setColor("#fcba03"),
        ],
      });
    } catch (e) {
      console.log(e);
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Je suis brisé! ☠️`)
            .setColor("#fc0303"),
        ],
      });
    }
  },
};
