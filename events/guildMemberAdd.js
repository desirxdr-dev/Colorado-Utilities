module.exports = {
name: "guildMemberAdd",

async execute(client, member) {

const WELCOME_CHANNEL_ID = "1470296592031682703";
const AUTO_ROLE_IDS = [
    "1470287484478033950",
    "1470287514026905726",
    "1470287516396556441"

];

try {

const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
const role = member.guild.roles.cache.get(AUTO_ROLE_IDS);

if (role) {
await member.roles.add(role);
}

if (channel) {
channel.send({
  "content": `Welcome ${member} to **Colorado State Roleplay**, an ER:LC roleplay server which provides the most immersive & realistic roleplay experience.`,
  "components": [
    {
      "type": 1,
      "components": [
        {
          "style": 2,
          "type": 2,
          "label": `${member.guild.memberCount}`,
          "emoji": {
            "id": "1483209858810646710",
            "name": "person",
            "animated": false
          },
          "disabled": true,
          "flow": {
            "actions": []
          },
          "custom_id": "p_280806775135932419"
        },
        {
          "type": 2,
          "style": 5,
          "label": "Information",
          "url": "https://discord.com/channels/1470287385081286801/1470294254055198857",
        }
      ]
    }
  ]
});
}

} catch (err) {
console.error("Join event error:", err);
}

}
};