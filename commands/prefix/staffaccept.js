module.exports = {
  name: "staffaccept",

  async execute(message, args, client) {

    // ===== CONFIG =====
    const REQUIRED_ROLE_ID = "1471741614463520868"; // who can use command
    const LOG_CHANNEL_ID = "1470297407722881096"; // where message gets sent

    const ROLES_TO_ADD = [
      "1470287448972988447",
      "1470287427301015563",
      "1470287449555992699",
      "1470287425824755785",
      "1470287450122223628"
    ];

    // ===== PERMISSION CHECK =====
    if (
      !message.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !message.member.permissions.has("Administrator")
    ) {
      return message.reply("<:xMark:1470645299730190376> You do **not** have **permission** to use this command.");
    }

    // ===== GET USER =====
    let userId = args[0];

    if (!userId) {
      return message.reply("<:xMark:1470645299730190376> Failed to fetch a **valid** user ID or **mention** from given arguments.");
    }

    // clean mention → ID
    userId = userId.replace(/[<@!>]/g, "");

    const member = await message.guild.members.fetch(userId).catch(() => null);

    if (!member) {
      return message.reply("<:xMark:1470645299730190376> Failed to **fetch** user.");
    }

    // ===== ADD ROLES =====
    try {
      for (const roleId of ROLES_TO_ADD) {
        await member.roles.add(roleId);
      }
    } catch (err) {
      console.error(err);
      return message.reply("<:xMark:1470645299730190376> Failed to **add** staff roles.");
    }

    // ===== SEND LOG MESSAGE =====
    const channel = message.guild.channels.cache.get(LOG_CHANNEL_ID);

    member.send("<:arrow:1470645281002360954> **Congratulations**! You have been **accepted** onto our **Staff Team**.")

    if (channel) {
      channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `${member} (\`${member.id}\`) has **passed** their staff application.`
        }
      ]
    }
  ]
});
    }

    
  }
};