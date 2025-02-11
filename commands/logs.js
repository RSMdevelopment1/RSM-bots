const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const dataPath = './data.json';

module.exports = {
    name: 'logs',
    description: 'Shows both wanted logs and arrest logs.',
    execute(message) {
        // Load data
        let data;
        try {
            data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        } catch (err) {
            return message.reply('Error reading logs. Please try again later.');
        }

        // Check if there are logs
        if (!data.wantedList.length && !data.arrestLogs.length) {
            return message.reply('There are no logs available.');
        }

        const embeds = [];

        // Wanted Logs Embed
        if (data.wantedList.length > 0) {
            const wantedEmbed = new EmbedBuilder()
                .setColor(0xFF0000) // Red color for wanted logs
                .setTitle('Wanted Logs')
                .setDescription('List of currently wanted individuals.')
                .setFooter({ text: 'Wanted List Logs' });

            data.wantedList.forEach(entry => {
                wantedEmbed.addFields({
                    name: `**${entry.username}**`,
                    value: `**Crime:** ${entry.crime}\n**Last Seen:** ${entry.lastSeen || 'Unknown'}`,
                    inline: false
                });
            });

            embeds.push(wantedEmbed);
        }

        // Arrest Logs Embed
        if (data.arrestLogs.length > 0) {
            const arrestEmbed = new EmbedBuilder()
                .setColor(0x008000) // Green color for arrest logs
                .setTitle('Arrest Logs')
                .setDescription('Records of recent arrests.')
                .setFooter({ text: 'Arrest List Logs' });

            data.arrestLogs.forEach(entry => {
                arrestEmbed.addFields({
                    name: `**${entry.suspect}**`,
                    value: `**Crime:** ${entry.crime}\n**Arrested By:** ${entry.officer}\n**Time:** ${entry.time}`,
                    inline: false
                });
            });

            embeds.push(arrestEmbed);
        }

        // Send Logs
        message.channel.send({ content: '**WANTED LOGS**', embeds: embeds.length > 0 ? embeds : null });
    }
};
