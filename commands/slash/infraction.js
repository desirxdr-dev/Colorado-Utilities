const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('../../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('infraction')
    .setDescription('Manage infractions')
    .addSubcommand(sub =>
      sub
        .setName('issue')
        .setDescription('Issue an infraction to a staff member.')
        .addUserOption(o => o.setName('user').setDescription('Select the user to infract.').setRequired(true))
        .addStringOption(opt =>
        opt.setName('type')
            .setDescription('Select the type of infraction to issue.')
            .setRequired(true)
   .        addChoices(
        { name: 'Warning', value: 'Warning' },
        { name: 'Strike', value: 'Strike' },
        { name: 'Suspension', value: 'Suspension' },
        { name: "Demotion", value: "Demotion"},
        { name: "Termination", value: "Termination"}
   )
)
        .addStringOption(o => o.setName('reason').setDescription('Input the reason for the infraction.').setRequired(true))
    )
    .addSubcommand(sub =>
      sub
        .setName('revoke')
        .setDescription('Revoke a logged infraction.')
        .addIntegerOption(o => o.setName('infraction_id').setDescription('Input the infraction ID to revoke.').setRequired(true))
    )
    .addSubcommand(sub =>
      sub
        .setName('view')
        .setDescription('View logged infractions for a staff member.')
        .addUserOption(o => o.setName('user').setDescription('Select the user to view infractions for.').setRequired(true))
    ),

async execute(interaction) {
  const REQUIRED_ROLE_ID = "1471741614463520868";

  // permission check
  if (
    !interaction.member.permissions.has(PermissionFlagsBits.Administrator) &&
    !interaction.member.roles.cache.has(REQUIRED_ROLE_ID)
  ) {
    return interaction.reply({ content: "<:xMark:1485791953307308223> You do **not** have **permission** to run this command.", ephemeral: true });
  }

  // get subcommand properly
  let sub;
  try {
    sub = interaction.options.getSubcommand();
  } catch {
    return interaction.reply({ content: "<:xMark:1485791953307308223> Invalid subcommand.", ephemeral: true });
  }

    if (sub === "issue") {
  const user = interaction.options.getUser("user", true);
  const type = interaction.options.getString("type", true);
  const reason = interaction.options.getString("reason");

  // create infraction in DB (returns row with id)
  const inf = db.createInfraction({
    userId: user.id,
    moderatorId: interaction.user.id,
    type,
    reason,
  });

  const id = inf.id;
  const TARGET_CHANNEL_ID = "1470297349006950515"; // change to your channel
  const channel = interaction.guild.channels.cache.get(TARGET_CHANNEL_ID);
  if (!channel) return interaction.reply({ content: "<:xMark:1485791953307308223> Target channel not found.", ephemeral: true });

  // build components object with values inserted
  const componentsPayload = {
    flags: 32768,
    components: [
      {
        type: 17,
        components: [
          { type: 10, content: `# Infraction Issued - #${id}` },
          { type: 14, spacing: 2 },
          {
            type: 10,
            content:
              `An infraction has been issued by ${interaction.user}.\n\n` +
              `**User**: ${user}\n` +
              `**Type**: ${type}\n` +
              `**Reason**: ${reason}\n` +
              `**Infraction ID**: ${id}`
          },
          { type: 14, spacing: 2 },
          {
            type: 12,
            items: [
              {
                media: {
                  url: "https://media.discordapp.net/attachments/1485354519163310110/1486230985522544740/Screenshot_2026-02-19_212527.png"
                }
              }
            ]
          }
        ]
      }
    ]
  };

  await channel.send(componentsPayload);

  await user.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `# Infraction Issued - #${id}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `An infraction has been issued to you.\n\n**Type**: ${type}\n**Reason**: ${reason}\n** Infraction ID**: ${id}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1485354519163310110/1486230985522544740/Screenshot_2026-02-19_212527.png?ex=69c4bff7&is=69c36e77&hm=8e54030a503682a86830992684c71241dedd238357cb34f9f19678d0708103d1&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
})

  return interaction.reply({ content: `<:check:1485791925935013960> Issued infraction #${id}.`, ephemeral: true });
}


    if (sub === "view") {
  const user = interaction.options.getUser("user", true);
  const rows = db.getInfractionsForUser(user.id);
  if (!rows.length) {
    return interaction.reply({ content: "<:xMark:1485791953307308223> No infractions for that user.", ephemeral: true });
  }

  // Limit to first 10 infractions to avoid huge messages
  const slice = rows.slice(0, 10);

  // Build the multi-infraction content string
  const infractionLines = slice
    .map(r => `**Infraction - ${r.id}**\n- ${r.type}\n- ${r.reason || "No reason provided"}`)
    .join("\n\n");

  await interaction.reply({
    flags: 32768,
    components: [
      {
        type: 17,
        components: [
          {
            type: 10,
            content: `# Infractions - ${user.username}`
          },
          {
            type: 14,
            spacing: 2
          },
          {
            type: 10,
            content: infractionLines
          },
          {
            type: 14,
            spacing: 2
          },
          {
            type: 12,
            items: [
              {
                media: {
                  url: "https://media.discordapp.net/attachments/1485354519163310110/1486230985522544740/Screenshot_2026-02-19_212527.png"
                }
              }
            ]
          }
        ]
      }
    ]
  });
}

  },
};
