// buttons/join_giveaway.js
const giveaways = require('../giveaways');

module.exports = {
  customId: 'join_giveaway',
  async execute(interaction) {
    try {
      const messageId = interaction.message.id;
      const g = giveaways.getGiveaway(messageId);
      if (!g || g.finished) return interaction.reply({ content: 'This giveaway is not active.', ephemeral: true });

      const added = giveaways.addEntry(messageId, interaction.user.id);
      if (!added) return interaction.reply({ content: 'Unable to join giveaway.', ephemeral: true });

      const entriesCount = g.entries.size;

      // Update message components: deep clone and update button label(s)
      const newComponents = JSON.parse(JSON.stringify(interaction.message.components));
      for (const row of newComponents) {
        for (const comp of row.components) {
          if (comp.custom_id === 'entries_giveaway' || comp.custom_id === 'join_giveaway') {
            if (typeof comp.label !== 'undefined') comp.label = `Entries: ${entriesCount}`;
          }
        }
      }

      await interaction.message.edit({ components: newComponents }).catch(() => {});
      return interaction.reply({ content: `You joined the giveaway! Entries: ${entriesCount}`, ephemeral: true });
    } catch (err) {
      console.error('join_giveaway error', err);
      return interaction.reply({ content: 'Error joining giveaway.', ephemeral: true });
    }
  }
};
