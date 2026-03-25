require("dotenv").config();
const fs = require("fs");
const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
const commandDir = "./commands/slash";

(async () => {
  try {
    console.log("Loading local commands...");
    const commandFiles = fs.readdirSync(commandDir).filter(f => f.endsWith(".js"));
    const commands = commandFiles.map(f => {
      const c = require(`${commandDir}/${f}`);
      if (!c?.data || typeof c.data.toJSON !== "function") throw new Error(`${f} missing valid data export`);
      return c.data.toJSON();
    });

    console.log("Fetching existing guild commands...");
    const existing = await rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID));
    if (existing && existing.length) {
      console.log(`Deleting ${existing.length} existing guild commands...`);
      await Promise.all(existing.map(cmd => rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, cmd.id))));
      console.log("Deleted existing commands.");
    } else {
      console.log("No existing guild commands to delete.");
    }

    console.log("Registering local commands...");
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
    console.log("Commands registered.");
  } catch (err) {
    console.error("Deploy error:", err);
    process.exit(1);
  }
})();
