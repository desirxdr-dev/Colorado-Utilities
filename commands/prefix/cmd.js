const axios = require("axios");
const { PermissionsBitField } = require("discord.js");

const REQUIRED_ROLE_ID = "1474259187885281420";
const COOLDOWN_MS = 5000;
const MAX_COMMAND_LENGTH = 500;

const EMO_CHECK = "<:check:1485791925935013960>";
const EMO_X = "<:xMark:1485791953307308223>";

const cooldowns = new Map(); // userId -> timestamp

module.exports = {
  name: "cmd",

  async execute(message, args) {
    try {
      if (message.author.bot) return;
      if (!message.guild) return message.reply(`${EMO_X} Use this command in a server.`);

      const API_KEY = process.env.ERLC_API_KEY;
      if (!API_KEY) return message.reply(`${EMO_X} ER:LC API not configured.`);

      const isAdmin = message.member.permissions.has(PermissionsBitField.Flags.Administrator);
      const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);
      if (!isAdmin && !hasRole) return message.reply(`${EMO_X} You do **not** have **permission** to run this command.`);

      if (!args.length) return message.reply(`${EMO_X} Provide a command to run.`);

      const now = Date.now();
      const last = cooldowns.get(message.author.id) || 0;
      if (now - last < COOLDOWN_MS) {
        return message.reply(`${EMO_X} You're on cooldown. Try again in ${Math.ceil((COOLDOWN_MS - (now - last)) / 1000)}s.`);
      }
      cooldowns.set(message.author.id, now);

      let rawCommand = args.join(" ").trim();
      if (!rawCommand) return message.reply(`${EMO_X} Empty command.`);
      if (rawCommand.length > MAX_COMMAND_LENGTH) rawCommand = rawCommand.slice(0, MAX_COMMAND_LENGTH);

      const res = await axios.post(
        "https://api.policeroleplay.community/v1/server/command",
        { command: rawCommand },
        {
          headers: {
            "Server-Key": API_KEY,
            "Content-Type": "application/json",
          },
          timeout: 8000,
        }
      );

      const apiMessage = res.data?.message || res.data?.result || null;
      const replyText = apiMessage
        ? `${EMO_CHECK} Executed:\n\`\`\`${rawCommand}\`\`\`\nServer: ${String(apiMessage)}`
        : `${EMO_CHECK} Executed:\n\`\`\`${rawCommand}\`\`\``;

      return message.reply(replyText);
    } catch (error) {
      console.error("CMD ERROR:", error.response?.data || error.message || error);
      return message.reply(`${EMO_X} Failed to execute command.`);
    } finally {
      // clear cooldown after some time to free memory
      setTimeout(() => cooldowns.delete(message.author.id), COOLDOWN_MS * 4);
    }
  },
};
