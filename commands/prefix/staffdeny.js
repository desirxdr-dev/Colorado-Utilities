module.exports = {
  name: "staffaccept",

  async execute(message, args, client) {

    // ===== CONFIG =====
    const REQUIRED_ROLE_ID = "1471741614463520868"; // who can use command
    const LOG_CHANNEL_ID = "1470297407722881096"; // where message gets sent


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
    // ===== SEND LOG MESSAGE =====
    const channel = message.guild.channels.cache.get(LOG_CHANNEL_ID);

    if (channel) {
      channel.send({
        content: `${member} (\`${member.id}\`) has **failed** their staff application.`
      });
    }

    
  }
};