const { ActivityType } = require("discord.js");

module.exports = {
name: "ready",
once: true,

execute(client) {

console.log(`${client.user.tag} is online.`);

function updateStatus() {

const guild = client.guilds.cache.first();
if (!guild) return;

client.user.setActivity(`${guild.memberCount} members`, {
type: ActivityType.Watching
});

}

updateStatus();
setInterval(updateStatus, 60000);

}
};