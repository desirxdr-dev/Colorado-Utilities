const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require("discord.js");

module.exports = {
  customId: "dm_reply",

  async execute(interaction) {

    const modal = new ModalBuilder()
      .setCustomId("dm_reply_modal")
      .setTitle("Message Reply");

    const input = new TextInputBuilder()
      .setCustomId("reply_text")
      .setLabel("Your Reply")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder().addComponents(input)
    );

    await interaction.showModal(modal);
  }
};