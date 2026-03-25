// commands/slash/giveaway.js
const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spgw')
    .setDescription('Host a sponsored giveaway.'),

  async execute(interaction) {
    // permission check optional; adjust as needed
    // await interaction.deferReply({ flags: 64 }); // not deferring because modal will be shown

    const REQUIRED_ROLE_ID = "1485339107206107349"

    if (
      !interaction.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      return interaction.reply({ content: "<:xMark:1485791953307308223> You do **not** have **permission** to run this command.", ephemeral: true });
    }

    const modal = new ModalBuilder().setCustomId('giveaway_modal').setTitle('Sponsored Giveaway');

    const prizeInput = new TextInputBuilder()
      .setCustomId('prize')
      .setLabel('Prize')
      .setPlaceholder('1000 Robux...')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const winnersInput = new TextInputBuilder()
      .setCustomId('winners')
      .setLabel('Winner(s)')
      .setPlaceholder('1')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const durationInput = new TextInputBuilder()
      .setCustomId('duration')
      .setLabel('Duration')
      .setPlaceholder('7d, 24h, 1m')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const linkInput = new TextInputBuilder()
      .setCustomId('link')
      .setLabel('Server Link')
      .setPlaceholder('https://discord.gg/')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder().addComponents(prizeInput),
      new ActionRowBuilder().addComponents(winnersInput),
      new ActionRowBuilder().addComponents(durationInput),
      new ActionRowBuilder().addComponents(linkInput)
    );

    await interaction.showModal(modal);
  }
};
