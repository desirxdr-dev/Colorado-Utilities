// modals/giveawayModal.js
const giveaways = require('../giveaways');

function parseDuration(s) {
  if (!s) return null;
  s = s.trim().toLowerCase();
  const m = s.match(/^(\d+)\s*(d|day|days)$/);
  if (m) return Number(m[1]) * 24 * 60 * 60 * 1000;
  const h = s.match(/^(\d+)\s*(h|hr|hours?)$/);
  if (h) return Number(h[1]) * 60 * 60 * 1000;
  const mm = s.match(/^(\d+)\s*(m|min|minutes?)$/);
  if (mm) return Number(mm[1]) * 60 * 1000;
  const short = s.match(/^(\d+)(d|h|m)$/);
  if (short) {
    const n = Number(short[1]);
    if (short[2] === 'd') return n * 24 * 60 * 60 * 1000;
    if (short[2] === 'h') return n * 60 * 60 * 1000;
    if (short[2] === 'm') return n * 60 * 1000;
  }
  if (/^\d+$/.test(s)) return Number(s) * 60 * 1000;
  return null;
}

module.exports = {
  customId: 'giveaway_modal',
  async execute(interaction) {
    // interaction is a ModalSubmitInteraction
    const prize = interaction.fields.getTextInputValue('prize');
    const winners = parseInt(interaction.fields.getTextInputValue('winners'), 10) || 1;
    const durationRaw = interaction.fields.getTextInputValue('duration');
    const link = interaction.fields.getTextInputValue('link') || '';

    const durMs = parseDuration(durationRaw);
    if (!durMs) {
      return interaction.reply({ content: 'Invalid duration format. Use 7d/48h/30m.', ephemeral: true });
    }

    const endsAt = Date.now() + durMs;
    const ts = Math.floor(endsAt / 1000);
    const relative = `<t:${ts}:R>`;

    // Build your component-style message (keeps your provided layout)
    const componentsPayload = {
      flags: 32768,
      components: [
        {
          type: 17,
          components: [
            { type: 10, content: '# 🌿 Sponsored Giveaway' },
            { type: 14, spacing: 1 },
            {
              type: 9,
              components: [
                {
                  type: 10,
                  content: `A new giveaway has been hosted by ${interaction.user}.\n\n<:Confetti:1485398170556043395> **Prize:** ${prize}\n<:Star:1485398594444857616> **Duration:** ${relative}\n<:Person:1485398120878575637> **Winners:** ${winners}`
                }
              ],
              accessory: {
                style: 2,
                type: 2,
                label: 'Entries: 0',
                custom_id: 'entries_giveaway',
                disabled: true
              }
            },
            { type: 14, spacing: 1 },
            {
              type: 9,
              components: [
                {
                  type: 10,
                  content: `<:Link:1485398278848778275> ${link}`
                }
              ],
              accessory: {
                style: 2,
                type: 2,
                label: 'Join Giveaway',
                custom_id: 'join_giveaway'
              }
            }
          ]
        }
      ]
    };

    // send message in the channel where modal was used
    const sent = await interaction.channel.send(componentsPayload);
    // create giveaway record
    giveaways.createGiveaway({
      messageId: sent.id,
      channelId: sent.channel.id,
      hostId: interaction.user.id,
      prize,
      winners,
      endsAt,
      link
    });

    return interaction.reply("<:check:1485791925935013960> **Successfully** posted giveaway.");
  }
};
