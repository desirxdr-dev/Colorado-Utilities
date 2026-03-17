const axios = require("axios");

module.exports = {
  name: "players",

  async execute(message) {

    const API_KEY = process.env.ERLC_API_KEY;

    try {

const res = await fetch("https://api.policeroleplay.community/v1/server/players", {
  headers: {
    "Authorization": process.env.ERLC_API_KEY,
    "Server-Key": process.env.ERLC_SERVER_KEY
  }
});

const data = await res.json();

// 🛑 handle API errors FIRST
if (!Array.isArray(data)) {
  console.log("ERLC API Error:", data);

  return message.channel.send("❌ ER:LC API error. Check your keys.");
}

// ✅ now it's safe
const players = data;

let playerList = players.length
  ? players.map(p => `- ${p.Player} (\`${p.UserId}\`) - ${p.Team}`).join("\n")
  : "- No players in-game.";

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
                content: playerList
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
        ]
      });

    } catch (err) {
      console.error(err);

      message.channel.send("<:xMark:1470645299730190376> Could not **cache** in-game **players**.");
    }

  }
};