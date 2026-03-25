require("dotenv").config();
const fs = require("fs");
const { REST, Routes } = require("discord.js");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands/slash")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  try {
    const command = require(`./commands/slash/${file}`);
    if (!command || !command.data || typeof command.data.toJSON !== "function") {
      throw new Error("Missing or invalid `data` export (SlashCommandBuilder expected)");
    }
    // attempt to convert to JSON to catch invalid structure early
    const json = command.data.toJSON();
    commands.push(json);
  } catch (err) {
    console.error(`Error processing ./commands/slash/${file}:`, err.message || err);
    process.exit(1);
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
    console.log("Slash commands registered.");
  } catch (error) {
    console.error(error);
  }
})();
