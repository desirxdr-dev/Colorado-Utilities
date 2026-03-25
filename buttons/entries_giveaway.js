// buttons/entries_giveaway.js
const giveaways = require('../giveaways');

module.exports = {
  customId: 'entries_giveaway',
  async execute(interaction) {
    try {
      const messageId = interaction.message.id;
      const g = giveaways.getGiveaway(messageId);
      if (!g) return interaction.reply({ content: 'Giveaway not found.', ephemeral: true });

      const arr = Array.from(g.entries);
      if (!arr.length) return interaction.reply({ content: 'No entries yet.', ephemeral: true });

      const users = await Promise.all(arr.map(id => interaction.client.users.fetch(id).catch(() => null)));
      const lines = users.map(u => u ? `${u.tag} (<@${u.id}>)` : `<@${id}>`).slice(0, 50);

      return interaction.reply({ content: `Entries:\n${lines.join('\n')}`, ephemeral: true });
    } catch (err) {
      console.error('entries_giveaway error', err);
      return interaction.reply({ content: 'Error fetching entries.', ephemeral: true });
    }
  }
};
