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
const playerList = players
  .map(p => {

    let username = p.Player;
    let userId = null;

    // case 1: "username:userid"
    if (p.Player.includes(":")) {
      const parts = p.Player.split(":");
      username = parts[0];
      userId = parts[1];
    }

    // case 2: separate field exists
    else if (p.UserId) {
      userId = p.UserId;
    }

    const team = p.Team && p.Team.trim() !== ""
      ? p.Team
      : "Civilian";

    // ✅ CLEAN OUTPUT (no undefined)
    if (userId) {
      return `- ${username} (\`${userId}\`) - ${team}`;
    } else {
      return `- ${username} - ${team}`;
    }

  })
  .join("\n");
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
                      url: "https://media.discordapp.net/attachments/1485354519163310110/1485528100266840154/image.png?ex=69c2da1a&is=69c1889a&hm=81da49b5557836e78e8f6f95bf34359331e8b69d725a74aed9cbcbed642824bd&=&format=webp&quality=lossless"
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
        content: "<:xMark:1485791953307308223> **Failed** to **cache** the currently in-game players.",
        allowedMentions: { repliedUser: false }
      });
    }

  }
};