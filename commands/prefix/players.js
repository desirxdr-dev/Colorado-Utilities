const axios = require("axios");

module.exports = {
  name: "players",

  async execute(message) {

    if (message.author.bot) return;

    // 🔹 REQUIRED ROLE
    const REQUIRED_ROLE_IDS = [
      "1470287425824755785"
    ];

    const isAdmin = message.member.permissions.has("Administrator");

    const hasRole = REQUIRED_ROLE_IDS.some(roleId =>
      message.member.roles.cache.has(roleId)
    );

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:xMark:1470645299730190376> You do **not** have **permission** to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    try {

      const res = await axios.get(
        "https://api.policeroleplay.community/v1/server/players",
        {
          headers: {
            "Server-Key": process.env.ERLC_API_KEY
          }
        }
      );

      const data = res.data;

      // 🛑 API error check
      if (!Array.isArray(data)) {
        console.log("ERLC API Error:", data);

        return message.reply({
          content: `<:xMark:1470645299730190376>ER:LC API Error: \`${data.message || "Unknown"}\``,
          allowedMentions: { repliedUser: false }
        });
      }

      const players = data;

      // 🔥 Build player list
      let playerList;

      if (!players.length) {
        playerList = "- No players in-game.";
      } else {
        playerList = players
          .map(p => {
            const username = p.Player.includes(":")
              ? p.Player.split(":")[0]
              : p.Player;

            const team = p.Team && p.Team.trim() !== ""
              ? p.Team
              : "Civilian";

            return `- ${username} (\`${p.UserId}\`) - ${team}`;
          })
          .join("\n");
      }

      // 🔥 Final content block
      const content = `${playerList}\n\n**Total Players**\n${players.length}/40`;

      await message.reply({
        flags: 32768,
        components: [
          {
            type: 17,
            components: [
              {
                type: 10,
                content: "#  Players In-Game"
              },
              {
                type: 14,
                spacing: 2
              },
              {
                type: 10,
                content: content
              },
              {
                type: 14,
                spacing: 2
              },
              {
                type: 12,
                items: [
                  {
                    media: {
                      url: "https://media.discordapp.net/attachments/1483193711671382067/1483193962209476688/Screenshot_2026-02-19_212527.png?ex=69b9b385&is=69b86205&hm=e6a896b7753828d73905ed1ea6dd4fbdd821d21888992bebf1243b2c0165e4e8&=&format=webp&quality=lossless"
                    }
                  }
                ]
              }
            ]
          }
        ],
        allowedMentions: { repliedUser: false }
      });

    } catch (err) {
      console.error("AXIOS ERROR:", err.response?.data || err.message);

      message.reply({
        content: "<:xMark:1470645299730190376> **Failed** to **cache** the currently in-game players.",
        allowedMentions: { repliedUser: false }
      });
    }

  }
};