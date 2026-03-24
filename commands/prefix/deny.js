module.exports = {
  name: "deny",

  async execute(message, args, client) {

    // ===== CONFIG =====
    const REQUIRED_ROLE_ID = "1471741614463520868"; // who can use command


    // ===== PERMISSION CHECK =====
    if (
      !message.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !message.member.permissions.has("Administrator")
    ) {
      return message.reply("<:xMark:1485791953307308223> You do **not** have **permission** to use this command.");
    }

    // ===== GET USER =====
    let userId = args[0];

    if (!userId) {
      return message.reply("<:xMark:1485791953307308223> Failed to fetch a **valid** user ID or **mention** from given arguments.");
    }

    // clean mention → ID
    userId = userId.replace(/[<@!>]/g, "");

    const member = await message.guild.members.fetch(userId).catch(() => null);

    if (!member) {
      return message.reply("<:xMark:1485791953307308223> Failed to **fetch** user.");
    }


    try {
  await message.delete();
} catch {}

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
                "url": "https://media.discordapp.net/attachments/1485354519163310110/1485528100266840154/image.png?ex=69c2da1a&is=69c1889a&hm=81da49b5557836e78e8f6f95bf34359331e8b69d725a74aed9cbcbed642824bd&=&format=webp&quality=lossless"
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