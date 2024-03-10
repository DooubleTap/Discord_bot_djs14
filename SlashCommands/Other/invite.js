const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Lien d'invitation permanant"),
  execute: async (client, interaction) => {
    const embed = new EmbedBuilder()
      //.setTitle("Je viens de start!")
      .setColor("#fcba03")
      .setAuthor({
        name: "Informations",
        iconURL: "https://i.imgur.com/iTvSZG3.png",
        url: "https://discord.gg/secretlife",
      })
      /* .setDescription(
        `Date de création du projet: <t:${parseInt(
          client.user.createdAt / 1000
        )}:R>`
      ) */
      .setThumbnail("https://i.imgur.com/f7BPrrA.png")
      .addFields({
        name: "Clique droit et Copiez le lien",
        value: "https://discord.gg/secretliferoleplay",
      })
      .setFooter({
        text: "Aide pour le bot: /botinfo",
        iconURL: "https://i.imgur.com/0rQTkIk.png",
      });

    await interaction.reply({
      embeds: [embed],
      ephemeral: false,
    });
  },
};
