module.exports = (client) => {
  const fs = require("node:fs");
  const folders = fs.readdirSync("./SlashCommands");
  for (const folder of folders) {
    const commandFiles = fs
      .readdirSync(`./SlashCommands/${folder}/`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`../SlashCommands/${folder}/${file}`);
      client.commands.set(command.data.name, command);
    }
  }
};
