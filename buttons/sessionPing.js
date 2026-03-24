module.exports = {
  customId: "p_283388474730483715",

  async execute(interaction) {

    const ROLE_ID = "1470287486952673300";
    const role = interaction.guild.roles.cache.get(ROLE_ID);

    if (!role) {
      return interaction.reply({
        content: "<:xMark:1485791953307308223> **Failed** to cache **sessions** role.",
        ephemeral: true
      });
    }

    const member = interaction.member;

    try {

      if (member.roles.cache.has(ROLE_ID)) {

        await member.roles.remove(ROLE_ID);

        return interaction.reply({
          content: "<:arrow:1470645281002360954> **Removed** session ping role.",
          ephemeral: true
        });

      } else {

        await member.roles.add(ROLE_ID);

        return interaction.reply({
          content: "<:arrow:1470645281002360954> **Added** session ping role.",
          ephemeral: true
        });

      }

    } catch (err) {
      console.error(err);

      interaction.reply({
        content: "<:xMark:1485791953307308223> **Failed** to update roles.",
        ephemeral: true
      });
    }

  }
};