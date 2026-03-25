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
  }

    };
