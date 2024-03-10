// SVP, ne changez pas sa, c'est les informations du developeur.. (Moi)
// Ce n'es pas du spam, mais des credits, pour rendre le bot plus populaire!
// La commande apparait meme pas dans les channels!
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { colorEmbed } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Credits du bot"),
  execute: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor(colorEmbed)
      .setDescription(
        "## Faite par [`DooubleTap`](<https://discord.com/users/76182535192715264>) 💚 \n\nMes liens: [`Github`](https://github.com/DooubleTap) | [`npmjs.org`](https://www.npmjs.com/~dooubletap)"
      )
      .addFields(
        {
          name: "\u200B",
          value:
            "[`Rejoignez le serveur de support en cliquant ici`](https://discord.gg/NnTg49J4Zc)",
        },
        {
          name: "\u200B",
          value: "[`Le bot sera publique soon`](https://coming.soon/)",
        }
      )
      .setTimestamp()
      .setFooter({
        text: "Cette page est généré avec: /botinfo",
        iconURL: "https://i.imgur.com/0rQTkIk.png",
      });
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
