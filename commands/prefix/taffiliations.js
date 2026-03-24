module.exports = {
    name: "taffiliation",

    async execute(message, args, client){

    const REQUIRED_ROLE_ID = "1470287425824755785"; // who can use command


    // ===== PERMISSION CHECK =====
    if (
      !message.member.roles.cache.has(REQUIRED_ROLE_ID) &&
      !message.member.permissions.has("Administrator")
    ) {
      return message.reply("<:xMark:1485791953307308223> You do **not** have **permission** to use this command.");
    }


    await message.channel.send({
  "content": "# <:Qmark:1485398931557978213> Affiliations\nOur affiliations at <:ontariorp:1485831045554372609> **Ontario Roleplay** are handpicked by our **Directive Team**. Opening\n a ticket to affiliate may result in moderation. We will reach out to your server if we are \ninterested in affiliating with you."
})

    }

}