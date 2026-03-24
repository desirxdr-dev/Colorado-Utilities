const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("session")
    .setDescription("Session announcements")

    .addSubcommand(sub =>
      sub.setName("startup").setDescription("Start the in-game server up.")
    )

    .addSubcommand(sub =>
      sub.setName("shutdown").setDescription("Shut the in-game server down.")
    )

    .addSubcommand(sub =>
      sub.setName("boost").setDescription("Boost the in-game server's playercount.")
    )

    .addSubcommand(sub =>
      sub.setName("full").setDescription("Send the session full message.")
    ),

  async execute(interaction) {

    const SESSION_CHANNEL_ID = "1470295047173046322";

    const STARTUP_ROLES = ["1470287421177462804", "1471741614463520868"];
    const SHUTDOWN_ROLES = ["1470287423891308678", "1470287421177462804", "1471741614463520868"];
    const BOOST_ROLES = ["1470287421177462804", "1471741614463520868"];
    const FULL_ROLES = ["1470287423891308678", "1470287421177462804", "1471741614463520868"];

    const channel = interaction.guild.channels.cache.get(SESSION_CHANNEL_ID);
    if (!channel) return;

    const sub = interaction.options.getSubcommand();

    /* ---------------- STARTUP ---------------- */

    if (sub === "startup") {

      if (
        !interaction.member.roles.cache.some(role => STARTUP_ROLES.includes(role.id)) &&
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        return interaction.reply({
          content: "<:xMark:1485791953307308223> You do **not** have **permission** to run this command.",
          ephemeral: true
        });
      }

      await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Session Start-Up\n@here | <@&1470287486952673300>"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": "Our in-game server has started up. If you are looking to join the server, view the in-game information below.\n\n- **Server Name**\nColorado State Roleplay I Strict I Immersive\n- **Sever Owner**\ndesirxdr\n- **Server Code**\ncolsrps\n- **Requirements**\nTier 1\n\nIf you need assistance in-game, say `!mod` in **ROBLOX** chat and an in-game moderator will assist you."
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
                "url": "https://media.discordapp.net/attachments/1483193711671382067/1483193962209476688/Screenshot_2026-02-19_212527.png?ex=69b9b385&is=69b86205&hm=e6a896b7753828d73905ed1ea6dd4fbdd821d21888992bebf1243b2c0165e4e8&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});

      return interaction.reply({
        content: "<:check:1485791925935013960> **Successfully** started up the in-game server.",
        ephemeral: true
      });

    }

    /* ---------------- SHUTDOWN ---------------- */

    if (sub === "shutdown") {

      if (
        !interaction.member.roles.cache.some(role => SHUTDOWN_ROLES.includes(role.id)) &&
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        return interaction.reply({
          content: "<:xMark:1485791953307308223> You do **not** have **permission** to run this command.",
          ephemeral: true
        });
      }

      await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Session Shutdown"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 9,
          "components": [
            {
              "type": 10,
              "content": "> Our in-game server has now shutdown. We thank everyone who attended for joining. Another session will be hosted shortly. Receive our session ping role using the button."
            }
          ],
          "accessory": {
            "style": 4,
            "type": 2,
            "label": "Ping",
            "flow": {
              "actions": []
            },
            "custom_id": "p_283388474730483715"
          }
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
                "url": "https://media.discordapp.net/attachments/1485354519163310110/1485528100266840154/image.png?ex=69c2da1a&is=69c1889a&hm=81da49b5557836e78e8f6f95bf34359331e8b69d725a74aed9cbcbed642824bd&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});

      return interaction.reply({
        content: "<:check:1485791925935013960> **Successfully** shutdown the in-game server.",
        ephemeral: true
      });

    }

    /* ---------------- BOOST ---------------- */

    if (sub === "boost") {

      if (
        !interaction.member.roles.cache.some(role => BOOST_ROLES.includes(role.id)) &&
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        return interaction.reply({
          content: "<:xMark:1485791953307308223> You do **not** have **permission** to run this command.",
          ephemeral: true
        });
      }

      await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Session Boost\n@here | <@&1470287486952673300>"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 9,
          "components": [
            {
              "type": 10,
              "content": "Our in-game server has a low amount of players. Join the server for an immersive roleplay experience."
            }
          ],
          "accessory": {
            "type": 2,
            "style": 5,
            "label": "Join",
            "url": "https://policeroleplay.community/join/colsrps",
          }
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
                "url": "https://media.discordapp.net/attachments/1483193711671382067/1483193962209476688/Screenshot_2026-02-19_212527.png?ex=69b9b385&is=69b86205&hm=e6a896b7753828d73905ed1ea6dd4fbdd821d21888992bebf1243b2c0165e4e8&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});

      return interaction.reply({
        content: "<:check:1485791925935013960> **Successfully** boosted the in-game server.",
        ephemeral: true
      });

    }

    /* ---------------- FULL ---------------- */

    if (sub === "full") {

      if (
        !interaction.member.roles.cache.some(role => FULL_ROLES.includes(role.id)) &&
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        return interaction.reply({
          content: "<:xMark:1485791953307308223> You do **not** have **permission** to run this command.",
          ephemeral: true
        });
      }

      await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Session Full"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 9,
          "components": [
            {
              "type": 10,
              "content": "Our in-game server is now full. Continue to join for an immersive roleplay experience. Keep in mind that there may be a queue when attempting to join."
            }
          ],
          "accessory": {
            "type": 2,
            "style": 5,
            "label": "Join",
            "url": "https://policeroleplay.community/join/colsrps",
          }
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
                "url": "https://media.discordapp.net/attachments/1483193711671382067/1483193962209476688/Screenshot_2026-02-19_212527.png?ex=69b9b385&is=69b86205&hm=e6a896b7753828d73905ed1ea6dd4fbdd821d21888992bebf1243b2c0165e4e8&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});

      return interaction.reply({
        content: "<:check:1485791925935013960> **Successfully** sent full message.",
        ephemeral: true
      });

    }

  }

};