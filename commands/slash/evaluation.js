const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("evaluation")
    .setDescription("Evaluation stuff.")

    .addSubcommand(sub =>
      sub.setName("issue").setDescription("Issue an evaluation to a user.")
    )
        .addUserOption(option =>
            option
            .setName("user")
            .setDescription("Select the staff memebr you'd like to evaluate.")
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
        ),

  async execute(interaction) {

    const HR_ROLE_ID = "1471741614463520868";
    const EVALUATION_CHANNEL_ID = "1470297377935196344";

    const channel = interaction.guild.channels.cache.get(EVALUATION_CHANNEL_ID);
    if (!channel) return;

    const user = interaction.options.getUser("user");
    const rating = interaction.options.getNumber("rating");
    const feedback = interaction.options.getString("feedback");

    channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Staff Evaluation"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `A staff evaluation has been issued.\n\n**User**: ${user}\n**Rating**: ${rating}\n**Feedback**: ${feedback}`
        },
        {
          "type": 1,
          "components": [
            {
              "style": 1,
              "type": 2,
              "label": `${rating}/5`,
              "disabled": true,
              "flow": {
                "actions": []
              },
              "custom_id": "p_283972826510135297"
            }
          ]
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

  await user.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Staff Evaluation"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `A staff evaluation has been issued to you by our **High Rank Team**.\n\n**Rating**: ${rating}\n**Feedback**: ${feedback}`
        },
        {
          "type": 1,
          "components": [
            {
              "style": 1,
              "type": 2,
              "label": `${rating}/5`,
              "disabled": true,
              "flow": {
                "actions": []
              },
              "custom_id": "p_283972826510135297"
            }
          ]
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
  }
  

    };
