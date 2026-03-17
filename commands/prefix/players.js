const axios = require("axios");

module.exports = {
  name: "players",

  async execute(message) {

    try {

      const res = await axios.get(
        "https://api.policeroleplay.community/v1/server/players",
        {
          headers: {
            Authorization: process.env.ERLC_API_KEY
          }
        }
      );

      const data = res.data;

      // 🛑 handle errors
      if (!Array.isArray(data)) {
        console.log("ERLC API Error:", data);

        return message.channel.send(
          `❌ ER:LC API Error: \`${data.message || "Unknown"}\``
        );
      }

      const playerList = data.length
        ? data.map(p => `- ${p.Player} (\`${p.UserId}\`) - ${p.Team}`).join("\n")
        : "- No players in-game.";

      await message.channel.send({
        flags: 32768,
        components: [
          {
            type: 17,
            components: [
              { type: 10, content: "#  Players In-Game" },
              { type: 14, spacing: 2 },
              { type: 10, content: playerList },
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

    } catch (err) {
      console.error("AXIOS ERROR:", err.response?.data || err.message);

      message.channel.send("<:xMark:1470645299730190376> Could not fetch players.");
    }

  }
};