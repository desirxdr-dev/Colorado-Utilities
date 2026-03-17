module.exports = {
  name: "interactionCreate",

  async execute(client, interaction) {

    // 🔹 SLASH COMMANDS
    if (interaction.isChatInputCommand()) {

      const command = client.slashCommands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }

    }

    // 🔹 BUTTONS
    if (interaction.isButton()) {

      const button = client.buttons.get(interaction.customId);
      if (!button) return;

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }

    }

    // 🔥 ADD THIS (MODALS)
    if (interaction.isModalSubmit()) {

      const modal = client.modals.get(interaction.customId);
      if (!modal) return;

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }

    }

  }
};