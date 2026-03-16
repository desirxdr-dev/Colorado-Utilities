module.exports = {
name: "interactionCreate",

async execute(client, interaction) {

if (interaction.isChatInputCommand()) {

const command = client.slashCommands.get(interaction.commandName);
if (!command) return;

try {

await command.execute(interaction, client);

} catch (error) {

console.error(error);

}

}

if (interaction.isButton()) {

const button = client.buttons.get(interaction.customId);
if (!button) return;

try {

await button.execute(interaction, client);

} catch (error) {

console.error(error);

}

}

}
};