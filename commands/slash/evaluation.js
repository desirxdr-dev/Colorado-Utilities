const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("evaluation")
    .setDescription("Evaluation stuff.")
    .addSubcommand(sub =>
      sub
        .setName("issue")
        .setDescription("Issue an evaluation to a user.")
        .addUserOption(option =>
          option
            .setName("user")
            .setDescription("Select the staff member you'd like to evaluate.")
            .setRequired(true)
        )
        .addNumberOption(option =>
          option
            .setName("rating")
            .setDescription("Input the rating (1-5)")
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName("feedback")
            .setDescription("Input feedback for the user.")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const REQUIRED_ROLE_ID = "1471741614463520868"; // put your HR role id here
    const EVALUATION_CHANNEL_ID = "1470297377935196344";

    // permission check
    if (
      !interaction.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      return interaction.reply({ content: "<:xMark:1485791953307308223> You do **not** have permission to run this command.", ephemeral: true });
    }

    const channel = interaction.guild.channels.cache.get(EVALUATION_CHANNEL_ID);
    if (!channel) return interaction.reply({ content: "Evaluation channel not found.", ephemeral: true });

    const sub = interaction.options.getSubcommand();
    if (sub !== "issue") return interaction.reply({ content: "Unknown subcommand.", ephemeral: true });

    const user = interaction.options.getUser("user", true);
    const rating = interaction.options.getNumber("rating", true);
    const feedback = interaction.options.getString("feedback", true);

    await channel.send({
      flags: 32768,
      components: [
        {
          type: 17,
          components: [
            { type: 10, content: "# Staff Evaluation" },
            { type: 14, spacing: 2 },
            {
              type: 10,
              content: `A staff evaluation has been issued.\n\n**User**: ${user}\n**Rating**: ${rating}\n**Feedback**: ${feedback}`
            },
            {
              type: 1,
              components: [
                {
                  style: 1,
                  type: 2,
                  label: `${rating}/5`,
                  disabled: true,
                  flow: { actions: [] },
                  custom_id: "p_283972826510135297"
                }
              ]
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
    });

    try {
      await user.send({
        flags: 32768,
        components: [
          {
            type: 17,
            components: [
              { type: 10, content: "# Staff Evaluation" },
              { type: 14, spacing: 2 },
              {
                type: 10,
                content: `A staff evaluation has been issued to you by our High Rank Team.\n\n**Rating**: ${rating}\n**Feedback**: ${feedback}`
              },
              {
                type: 1,
                components: [
                  {
                    style: 1,
                    type: 2,
                    label: `${rating}/5`,
                    disabled: true,
                    flow: { actions: [] },
                    custom_id: "p_283972826510135297"
                  }
                ]
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
      });
    } catch (e) { /* ignore DM failures */ }

    await interaction.reply({ content: "<:check:1485791925935013960> **Successfully** issued evaluation.", ephemeral: true });
  }
};
