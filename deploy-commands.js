require("dotenv").config();
const fs = require("fs");
const util = require("util");
const { REST, Routes } = require("discord.js");

const commandDir = "./commands/slash";
const files = fs.readdirSync(commandDir).filter(f => f.endsWith(".js"));

for (const file of files) {
  const path = `${commandDir}/${file}`;
  console.log("Processing:", path);
  try {
    const command = require(path);
    if (!command || !command.data || typeof command.data.toJSON !== "function") {
      throw new Error("Missing or invalid `data` export (SlashCommandBuilder expected)");
    }

    // convert to JSON and print a compact inspect of top-level options
    const json = command.data.toJSON();
    console.log("-> name:", json.name, "description:", json.description);
    console.log("-> options keys:", Object.keys(json).filter(k => k === "options" || k === "default_permission"));
    if (json.options) {
      console.log("-> options length:", json.options.length);
      // print each option type and name
      json.options.forEach((opt, i) => {
        console.log(`   [${i}] type=${opt.type} name=${opt.name} ${opt.options ? `(has nested options ${opt.options.length})` : ""}`);
      });
    }

    // attempt to push to array to mimic deploy behavior
    // (we won't actually call Discord here)
  } catch (err) {
    console.error("ERROR in", path);
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

console.log("No invalid files detected in local check. If you still get Discord error, paste the output above here.");
