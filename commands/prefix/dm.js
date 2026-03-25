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
    const LOG_CHANNEL_ID = "1483355559943077918"; // where message gets sent


    const isAdmin = message.member.permissions.has("Administrator");
const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);
    if (!isAdmin && !hasRole) {
      return message.reply("<:xMark:1485791953307308223> You do **not** have **permission** to use this command.");
    }

    const userId = args[0];
    const text = args.slice(1).join(" ");

    if (!userId || !text) {
      return message.reply("<:xMark:1485791953307308223> **Failed** to fetch a valid **user ID** or **message**.");
    }

    let user;
    try {
      user = await message.client.users.fetch(userId);
    } catch {
      return message.reply("<:xMark:1485791953307308223> Failed to **fetch** a **valid** user ID.");
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
                      url: "https://media.discordapp.net/attachments/1485354519163310110/1485528100266840154/image.png?ex=69c2da1a&is=69c1889a&hm=81da49b5557836e78e8f6f95bf34359331e8b69d725a74aed9cbcbed642824bd&=&format=webp&quality=lossless"
                    }
                  }
                ]
              }
            ]
          }
        ]
      });

      
    const channel = message.guild.channels.cache.get(LOG_CHANNEL_ID);

    if (channel) {
      channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Message Log"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `A message has been sent by ${interaction.user} using the bot.\n\n**User**: ${user}\n**Message**: ${messsage}`
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
                "url": "https://media.discordapp.net/attachments/1485354519163310110/1486230985522544740/Screenshot_2026-02-19_212527.png?ex=69c568b7&is=69c41737&hm=2e8db25aab9a4698240d0ba9e59dda14a18a30f76bd3eef854e25b10087729a4&=&format=webp&quality=lossless&width=2342&height=120"
              }
            }
          ]
        }
      ]
    }
  ]
})
    }

      message.reply(`<:check:1470645249398542437> **Sucdcessfully** sent message to <@${userId}>.`);

    } catch {
      message.reply("<:xMark:1485791953307308223> **Failed** to **message** user.");
    }
  }
};