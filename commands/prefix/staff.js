module.exports = {

name: "staff",

async execute(message, args, client) {

await message.reply({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "*Apply for staff [here](https://docs.google.com/forms/d/e/1FAIpQLSeP6UHi4jFVar35-kkfBF0xOEXhjnVmmraPvZMyEHkeMuKFkg/viewform?usp=dialog)*"
        },
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Link",
              "url": "https://docs.google.com/forms/d/e/1FAIpQLSeP6UHi4jFVar35-kkfBF0xOEXhjnVmmraPvZMyEHkeMuKFkg/viewform?usp=dialog",
            }
          ]
        }
      ]
    }
  ]
});

}

};