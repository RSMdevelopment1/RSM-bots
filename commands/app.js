const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'app',
    description: 'Get the bot invite link!',
    async execute(message, args) {
        // Bot invite link (replace YOUR_BOT_CLIENT_ID)
        const inviteLink = 'https://discord.com/oauth2/authorize?client_id=1335282366536749166&permissions=8&integration_type=0&scope=bot+applications.commands';

        // Create embed message
        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle(' Bot Invite Link')
            .setDescription(`[Click here to invite me!](${inviteLink})`)
            .setFooter({ text: 'Thanks for using me!' });

        try {
            // Send the message in DM
            await message.author.send({ embeds: [embed] });

            // If command is used in a server, reply and let them know it's sent
            if (message.guild) {
                message.reply('📩 Check your DMs for the bot invite link!');
            }
        } catch (error) {
            console.error('Could not send DM:', error);
            message.reply('❌ I couldn’t DM you! Please check your settings.');
        }
    },
};
