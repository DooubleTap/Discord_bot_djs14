const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { colorEmbed, embedImage, discordInvite } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("aide")
    .setDescription("Voir le panneau d'aide!"),
  execute: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor(colorEmbed)
      .setImage(embedImage)
/*    .setTitle("Invitez moi sur votre serveur!")
      .setURL(discordInvite) */
      .setAuthor({
        name: "Informations",
        iconURL: "https://i.imgur.com/iTvSZG3.png",
        url: discordInvite,
      })
      .setThumbnail("https://i.imgur.com/f7BPrrA.png")
      .addFields(
        {
          name: "**Liste des commandes du bot**",
          value: "Tout les commandes disponible ci-dessou sont cliquable! Si vous avez une suggestion pour une commande de plus, regardez </botinfo:1147720994065235987>",
        },
        {
          name: "</invite:1168907720712269879>",
          value: "`Lien d'invitation`",
          inline: true,
        },
        {
          name: "</botinfo:1168907720712269876>",
          value: "`Info bot`",
          inline: true,
        },
        {
          name: "</serverinfo:1168907720712269880>",
          value: "`Info Serveur`",
          inline: true,
        },
        {
          name: "</userinfo:1168907720712269883>",
          value: "`Info sur un membre`",
          inline: true,
        },
        {
          name: "</aide:1168907720712269875>",
          value: "`Voir ce menu`",
          inline: true,
        },
        { name: "**Les autres commands sont réservé pour le staff**", value: "\u200B" }
      )

      /* .setTimestamp() */
      .setFooter({
        text: "Aide pour le bot: /botinfo",
        iconURL: "https://i.imgur.com/0rQTkIk.png",
      });

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
