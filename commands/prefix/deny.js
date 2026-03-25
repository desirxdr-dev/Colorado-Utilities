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
                "url": "hhttps://media.discordapp.net/attachments/1485354567641202859/1486234459153109063/Screenshot_2026-03-24_222348.png?ex=69c56bf3&is=69c41a73&hm=12d09a96a1ff62b9426ab7db8b306cd66500aed3649195db122a4a16ef719a56&=&format=webp&quality=lossless&width=2324&height=266"
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