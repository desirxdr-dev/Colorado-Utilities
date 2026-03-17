module.exports = {
  name: "accept",

  async execute(message, args, client) {

    // ===== CONFIG =====
    const REQUIRED_ROLE_ID = "1471741614463520868"; // who can use command


    // ===== PERMISSION CHECK =====
    if (
      !message.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !message.member.permissions.has("Administrator")
    ) {
      return message.reply("<:xMark:1470645299730190376> You do **not** have **permission** to use this command.");
    }

    // ===== GET USER =====
    let userId = args[0];

    if (!userId) {
      return message.reply("<:xMark:1470645299730190376> Failed to fetch a **valid** user ID or **mention** from given arguments.");
    }

    // clean mention → ID
    userId = userId.replace(/[<@!>]/g, "");

    const member = await message.guild.members.fetch(userId).catch(() => null);

    if (!member) {
      return message.reply("<:xMark:1470645299730190376> Failed to **fetch** user.");
    }


      message.channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Application Denied"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `Thanks for showing interest in applying ${member}. Unfortunately, your application has been denied. Denial reasons will not be provided; however, if you have any questions, feel free to ask below.`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1483193711671382067/1483193962209476688/Screenshot_2026-02-19_212527.png?ex=69b9b385&is=69b86205&hm=e6a896b7753828d73905ed1ea6dd4fbdd821d21888992bebf1243b2c0165e4e8&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});
    }

    
  }