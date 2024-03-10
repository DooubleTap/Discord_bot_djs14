/* Clairement ce script fait le contraire de addRole.js :)  */
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const { citoyen, immigrant, staffRole } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("immigrant")
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
      return await interaction.reply({
        content: "Je ne trouve pas le membre",
        ephemeral: true,
      });
    if (!interaction.member.roles.cache.has(staffRole))
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `Vous devez etre staff pour utiliser cette commande`
            )
            .setColor("#fc0303"),
        ],
      });
    await interaction.deferReply();
    try {
      await target.roles.remove(citoyen);
      await target.roles.add(immigrant);
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Vous avez bien retiré la douane a ${target.user}`)
            .setColor("#fcba03"),
        ],
      });
    } catch (e) {
      console.log(e);
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Je suis brisé!`)
            .setColor("#fc0303"),
        ],
      });
    }
  },
};
