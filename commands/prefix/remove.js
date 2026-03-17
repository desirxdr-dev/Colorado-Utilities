module.exports = {
  name: "remove",

  async execute(message, args) {

    if (message.author.bot) return;

    // 🔹 REQUIRED ROLE
    const REQUIRED_ROLE_ID = "1471741614463520868";

    // 🔹 STAFF ROLES TO REMOVE
    const STAFF_ROLE_IDS = [
      "1470287420007256127",
      "1483192559671971941",
      "1471741614463520868",
      "1470287449555992699",
      "1470287420682403941",
      "1470287421177462804",
      "1470287421802418330",
      "1470287422272180467",
      "1470287422809178154",
      "1470287423316431052",
      "1470287423891308678",
      "1470287424759402526",
      "1470287425040285902",
      "1470287448972988447",
      "1470287427301015563",
      "1470287425795526882",
      "1470287426768339038",
      "1470287425824755785"

    ];

    // 🔹 LOG CHANNEL
    const LOG_CHANNEL_ID = "1470297407722881096";

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:xMark:1470645299730190376> You do **not** have **permission** to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    const userId = args[0];

    if (!userId) {
      return message.reply({
        content: "**<:xMark:1470645299730190376> Failed** to detect a valid **user ID**.",
        allowedMentions: { repliedUser: false }
      });
    }

    const target = message.guild.members.cache.get(userId);

    if (!target) {
      return message.reply({
        content: "<:xMark:1470645299730190376> **Failed** to cache user.",
        allowedMentions: { repliedUser: false }
      });
    }

    // 🔥 roles to remove
    const rolesToRemove = STAFF_ROLE_IDS.filter(roleId =>
      target.roles.cache.has(roleId)
    );

    if (!rolesToRemove.length) {
      return message.reply({
        content: "<:xMark:1470645299730190376> User is **not** a **staff** member.",
        allowedMentions: { repliedUser: false }
      });
    }

    try {

      await target.roles.remove(rolesToRemove);

      // optional nickname reset
      try {
        await target.setNickname(null);
      } catch {}

      // 🔹 LOG CHANNEL
      const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);

      if (logChannel) {
        await logChannel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `${target} (\`${target.id}\`) has been **removed** from the **Staff Team**.`
        }
      ]
    }
  ]
});
      }

      // 🧹 delete command
      try {
        await message.delete();
      } catch {}

      target.send("<:arrow:1470645281002360954>You have been **removed** from the **Staff Team**.")
      // ✅ confirmation
      await message.channel.send(
        `<:check:1470645249398542437> **Successfully** removed ${target} from the staff team.`
      );

    } catch (err) {
      console.error(err);

      message.reply({
        content: "<:xMark:1470645299730190376> An **error** occured while attempting to remove the user's roles.",
        allowedMentions: { repliedUser: false }
      });
    }

  }
};