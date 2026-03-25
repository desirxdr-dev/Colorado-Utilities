module.exports = {

name: "group",

async execute(message, args, client) {

await message.reply({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "*Join our **ROBLOX** group [here](https://www.roblox.com/communities/997454350/Colorado-State-Roleplay-I-ERLC-I-Roblox-Group#!/about)*"
        },
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Link",
              "url": "https://www.roblox.com/communities/997454350/Colorado-State-Roleplay-I-ERLC-I-Roblox-Group#!/about",
            }
          ]
        }
      ]
    }
  ]
});

}

};