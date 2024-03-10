const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { colorEmbed } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Provides information about the server.")
    .setDMPermission(false),

  async execute(client, interaction) {
    const { guild } = interaction;
    const { members, channels, emojis, roles, stickers, createdTimestamp } =
      guild;

    const embed = new EmbedBuilder()
      .setColor(colorEmbed)
      .setTitle(`${guild.name} - Server info`)
      .setThumbnail(guild.iconURL({ size: 256 }))
      .setImage(guild.bannerURL({ size: 256 }))
      .addFields(
        {
          name: "Création du serveur",
          value: `<t:${parseInt(createdTimestamp / 1000)}:F> (<t:${parseInt(
            createdTimestamp / 1000
          )}:R>)`,
          inline: false,
        },
        {
          name: "Fondateur",
          value: (await guild.fetchOwner()).user.tag,
          inline: false,
        }
        /*         {
          name: "\u200B",
          value: "------------------------------",
        } */
      )
      .addFields(
        {
          name: "Nombre de Boosts",
          value: guild.premiumSubscriptionCount.toString(),
          inline: true,
        },
        {
          name: "Boost Level",
          value: guild.premiumTier.toString(),
          inline: true,
        },
        {
          name: "Channel textuel",
          value: guild.channels.cache
            .filter((c) => c.type === 0)
            .size.toString(),
          inline: true,
        },
        {
          name: "Channels vocal",
          value: guild.channels.cache
            .filter((c) => c.type === 2)
            .size.toString(),
          inline: true,
        },
        {
          name: "Forums",
          value: guild.channels.cache
            .filter((c) => c.type === 15)
            .size.toString(),
          inline: true,
        },
        {
          name: "Catégories",
          value: guild.channels.cache
            .filter((c) => c.type === 4)
            .size.toString(),
          inline: true,
        },
        { name: "Membres", value: guild.memberCount.toString(), inline: true },

        {
          name: "Roles",
          value: guild.roles.cache.size.toString(),
          inline: true,
        },
        {
          name: "Emojis",
          value: guild.emojis.cache.size.toString(),
          inline: true,
        },
        {
          name: "Stickers",
          value: guild.stickers.cache.size.toString(),
          inline: true,
        },

        {
          name: "Liste des roles",
          value: guild.roles.cache.toJSON().join("\n "),
          inline: false,
        }
      );
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
