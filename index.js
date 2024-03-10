require("dotenv").config();
const { Client, GatewayIntentBits, Events, Collection } = require("discord.js");
require("./slash");
const { config } = require("./config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.commands = new Collection();

["events", "Slash"].forEach((el) => {
  require(`./handlers/${el}`)(client);
});




client.login(process.env.TOKEN);
