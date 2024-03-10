const { Client, BaseInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {Client} client
   * @param {BaseInteraction} interaction
   */
  run: async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(client, interaction);
      } catch (e) {
        console.error(e);
        if (interaction.replied || interaction.deferred) {
          await interaction.editReply({
            content:
              "Une erreur est survenu, svp rapportez la dans: /botinfo",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content:
              "Une erreur est survenu, svp rapportez la dans: /botinfo",
            ephemeral: true,
          });
        }
      }
    }
  },
};
