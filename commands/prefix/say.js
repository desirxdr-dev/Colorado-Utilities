module.exports = {
  name: "say",

  async execute(message, args) {

    if (message.author.bot) return;

    // 🔹 REQUIRED ROLE (SINGLE)
    const REQUIRED_ROLE_ID = "1470287418971258920"; // change this

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:xMark:1470645299730190376> You do **not** have **permission** to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    // ❌ no message
    if (!args.length) {
      return message.reply({
        content: "<:xMark:1470645299730190376> Failed to **fetch** message provided.",
        allowedMentions: { repliedUser: false }
      });
    }

    const text = args.join(" ");

    // 🧹 delete trigger
    try {
      await message.delete();
    } catch {}

    // 📤 send
    await message.channel.send(text);

  }
};