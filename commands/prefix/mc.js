module.exports = {

name: "mc",

async execute(message, args, client) {

const guild = message.guild;

const memberCount = guild.memberCount;
const boosts = guild.premiumSubscriptionCount;
const boostLevel = guild.premiumTier;

message.channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `<:members:1483213210667585606> **Membercount**: ${memberCount}\n<:rocket:1483213328657682515> **Boosts**: ${boosts} (Tier ${boostlevel})`
        }
      ]
    }
  ]
});

}

};