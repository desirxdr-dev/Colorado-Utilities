// buttons/join_giveaway.js
const giveaways = require('../giveaways');

module.exports = {
  customId: 'join_giveaway',
  async execute(interaction) {
    try {
      const messageId = interaction.message.id;
      const g = giveaways.getGiveaway(messageId);
      if (!g || g.finished) return interaction.reply({ content: 'This giveaway is not active.', ephemeral: true });

      const userId = interaction.user.id;
      const already = g.entries.has(String(userId));
      if (already) {
        giveaways.removeEntry(messageId, userId);
      } else {
        giveaways.addEntry(messageId, userId);
      }

      const entriesCount = g.entries.size;

      // Deep clone components and update the Entries button label only
      const newComponents = JSON.parse(JSON.stringify(interaction.message.components));
      for (const row of newComponents) {
        for (const comp of row.components) {
          if (comp.custom_id === 'entries_giveaway') {
            if (typeof comp.label !== 'undefined') comp.label = `Entries: ${entriesCount}`;
          }
        }
      }

      await interaction.message.edit({ components: newComponents }).catch(() => {});

      return interaction.reply({
        content: already ? `<:arrow:1470645281002360954> **Joined** giveaway.` : `<:arrow:1470645281002360954> **Left** giveaway.`,
        ephemeral: true
      });
    } catch (err) {
      console.error('join_giveaway error', err);
      return interaction.reply({ content: '<:xMark:1485791953307308223> An **error** occured.', ephemeral: true });
    }
  }
};
