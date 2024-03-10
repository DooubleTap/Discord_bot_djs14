const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
  } = require("discord.js");
  const {
    immigrant,
    staffRole,
    colorEmbed,
    channelFouille,
    channelReglements,
  } = require("../../config.json");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("newprojet")  /* La commande que tu tappe dans un channel */
      .setDescription("Utilisez seulement dans des tickets svp"), /* La description avant d'envoyer la commande */
    /**
     *
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    execute: async (client, interaction) => {
      const { member } = interaction;
  
      if (!interaction.member.roles.cache.has(staffRole)) /* Le role requis pour tapper la commande sur le serveur */
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `Vous devez etre staff pour utiliser cette commande`
              )
              .setColor("#fc0303"),
          ],
          ephemeral: true,
        });
      await interaction.deferReply();
      interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `Bonjour/bonsoir\n\nTout d'abord, nous vous remercions de montrer votre intérêt, ainsi que d'apporter des idées!\n\nblablablablablablabla`)
            .setColor(colorEmbed),
        ],
      });
      /* interaction.channel.send('Voici un lien a envoyer dans un message sous le embed si besoin:  https://discord.com/'); */
    },
  };
  