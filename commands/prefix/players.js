const axios = require("axios");

module.exports = {
  name: "players",

  async execute(message) {

    const API_KEY = process.env.ERLC_API_KEY;

    try {

      const res = await axios.get(
        "https://api.policeroleplay.community/v1/server/players",
        {
          headers: {
            Authorization: API_KEY
          }
        }
      );

      const players = res.data;

      // build player list
      let playerList = "";

      if (players.length === 0) {
        playerList = "- There are **no** players in-game.";
      } else {
        playerList = players
          .map(p => {
            return `- ${p.Player} (\`${p.UserId}\`) - ${p.Team}`;
          })
          .join("\n");
      }

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