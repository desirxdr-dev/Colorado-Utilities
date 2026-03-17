const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {
  name: "dm",

  async execute(message, args) {

    if (message.author.bot) return;

    // 🔹 REQUIRED ROLE
    const REQUIRED_ROLE_ID = "1470287418971258920";

    const isAdmin = message.member.permissions.has("Administrator");
const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);
    if (!isAdmin && !hasRole) {
      return message.reply("<:xMark:1470645299730190376> You do **not** have **permission** to use this command.");
    }

    const userId = args[0];
    const text = args.slice(1).join(" ");

    if (!userId || !text) {
      return message.reply("<:xMark:1470645299730190376> **Failed** to fetch a valid **user ID** or **message**.");
    }

    let user;
    try {
      user = await message.client.users.fetch(userId);
    } catch {
      return message.reply("<:xMark:1470645299730190376> Failed to **fetch** a **valid** user ID.");
    }

    // 🔥 BUTTON
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("dm_reply")
        .setLabel("Reply")
        .setStyle(ButtonStyle.Secondary)
    );

    try {
      await user.send({
        flags: 32768,
        components: [
          {
            type: 17,
            components: [
              { type: 10, content: "# Direct Message" },
              { type: 14, spacing: 2 },
              {
                type: 10,
                content:
                  "A message has been sent to you by our **Directive Team**. Ensure to reply as soon as possible if prompted to. Use the button below to reply."
              },
              { type: 14, divider: false },
              {
                type: 9,
                components: [
                  {
                    type: 10,
                    content: `**Message**: \`${text}\``
                  }
                ],
                accessory: {
                  style: 2,
                  type: 2,
                  label: "Reply",
                  custom_id: "dm_reply"
                }
              },
              { type: 14, spacing: 2 },
              {
                type: 12,
                items: [
                  {
                    media: {
                      url: "https://media.discordapp.net/attachments/1483193711671382067/1483193962209476688/Screenshot_2026-02-19_212527.png"
                    }
                  }
                ]
              }
            ]
          }
        ]
      });

      message.reply(`<:check:1470645249398542437> **Successfully** sent message to <@${userId}>.`);

    } catch {
      message.reply("<:xMark:1470645299730190376> **Failed** to **message** user.");
    }
  }
};