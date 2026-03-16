module.exports = {

customId: "test_button",

async execute(interaction) {

await interaction.reply({
content: "Button works.",
ephemeral: true
});

}

};