const fs = require("fs");

module.exports = (client) => {

const slashFiles = fs
  .readdirSync("./commands/slash")
  .filter(file => file.endsWith(".js"));

for (const file of slashFiles) {

const command = require(`../commands/slash/${file}`);
client.slashCommands.set(command.data.name, command);

}

const prefixFiles = fs
  .readdirSync("./commands/prefix")
  .filter(file => file.endsWith(".js"));

for (const file of prefixFiles) {

const command = require(`../commands/prefix/${file}`);
client.prefixCommands.set(command.name, command);

}

};