const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Change the bot status (Only for bot owner)')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The new status message')
                .setRequired(true)),

    name: 'status', // Prefix version
    description: 'Change the bot status (Only for bot owner)',

    async execute(interactionOrMessage, args) {
        const botOwnerId = '1172509278171562027'; // Replace with your Discord ID

        let newStatus;
        if (interactionOrMessage.isChatInputCommand?.()) {
            // Slash command version
            if (interactionOrMessage.user.id !== botOwnerId) {
                return interactionOrMessage.reply({ content: '❌ You are not authorized to change the bot status!', ephemeral: true });
            }
            newStatus = interactionOrMessage.options.getString('message');
        } else {
            // Prefix command version
            if (interactionOrMessage.author.id !== botOwnerId) {
                return interactionOrMessage.reply('❌ You are not authorized to change the bot status!');
            }
            if (!args.length) {
                return interactionOrMessage.reply('❌ Please provide a status message! Example: `!status Hosting a deployment`');
            }
            newStatus = args.join(' ');
        }

        // Update bot status
        interactionOrMessage.client.user.setPresence({
            activities: [{ name: newStatus, type: 0 }],
            status: 'online'
        });

        // Save to JSON file
        fs.writeFileSync('status.json', JSON.stringify({ status: newStatus }, null, 2));

        return interactionOrMessage.reply(`✅ Bot status updated to: **${newStatus}**`);
    }
};
