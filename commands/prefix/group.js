module.exports = {

name: "group",

async execute(message, args, client) {

message.channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "*Join our **ROBLOX** group [here](https://www.roblox.com/communities/917844454/Colorado-State-Roleplay-I-Group#!/about)*"
        },
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Link",
              "url": "https://www.roblox.com/communities/917844454/Colorado-State-Roleplay-I-Group#!/about",
              "custom_id": "p_280808289447448578"
            }
          ]
        }
      ]
    }
  ]
});

}

};