const fs = require("fs");
const path = require("path");

module.exports = (client) => {

  client.modals = new Map();

  const modalsPath = path.join(__dirname, "../modals");
  const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith(".js"));

  for (const file of modalFiles) {
    const modal = require(`../modals/${file}`);
    client.modals.set(modal.customId, modal);
  }

};