module.exports = {
name: "messageCreate",

async execute(client, message) {

if (message.author.bot) return;

const prefix = process.env.PREFIX;

if (!message.content.startsWith(prefix)) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();

const command = client.prefixCommands.get(commandName);

if (!command) return;

try {

await command.execute(message, args, client);

} catch (error) {

console.error(error);

}

}
};