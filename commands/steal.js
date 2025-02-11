const { Permissions } = require('discord.js');

module.exports = {
    name: 'steal',
    description: 'Steal an emoji or sticker from a message!',
    async execute(message, args) {
        // Check if the user has "Manage Emojis and Stickers" permission
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) {
            return message.reply("You do not have the required permissions to use this command.");
        }

        // If no argument is provided
        if (!args.length) {
            return message.reply("Please provide an emoji name or reply to a sticker to steal it.");
        }

        // Steal Emoji
        if (message.guild.emojis.cache.has(args[0])) {
            const emoji = message.guild.emojis.cache.get(args[0]);
            return message.reply(`Here is the emoji you requested: ${emoji}`);
        }

        // Steal Sticker (reply to a sticker)
        if (message.reference && message.content.toLowerCase() === "!steal") {
            const repliedMessage = await message.fetchReference();
            const sticker = repliedMessage.stickers.first();
            if (sticker) {
                return message.reply({ content: 'Here is the sticker you requested:', files: [sticker.url] });
            } else {
                return message.reply("No sticker found in the message you're replying to.");
            }
        }

        // Default Message if no emoji or sticker found
        return message.reply("Sorry, I could not find the emoji or sticker you requested.");
    },
};
