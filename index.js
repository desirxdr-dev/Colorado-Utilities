require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.slashCommands = new Collection();
client.prefixCommands = new Collection();
client.buttons = new Collection();

require("./handlers/commandLoader")(client);
require("./handlers/buttonLoader")(client);
require("./handlers/eventLoader")(client);

client.login(process.env.TOKEN);