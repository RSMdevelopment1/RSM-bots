const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const dataPath = './data.json';

module.exports = {
    name: 'wanted',
    description: 'Marks a player as wanted.',
    async execute(message, args) {
        if (args.length < 2) return message.reply('Usage: `!wanted [username] [crime]`');

        const username = args[0];
        const crime = args.slice(1).join(' ');

        let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Check if the user is already wanted
        if (data.wantedList.some(entry => entry.username.toLowerCase() === username.toLowerCase())) {
            return message.reply(`${username} is already on the wanted list.`);
        }

        // Add to wanted list & logs
        const wantedEntry = {
            username: username,
            crime: crime,
            lastSeen: "Unknown",
            timestamp: new Date().toLocaleString()
        };
        data.wantedList.push(wantedEntry);
        data.logs.push(`🚨 **${username}** is now **WANTED** for **${crime}** - (${wantedEntry.timestamp})`);

        // Save data
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        // Create and send embed
        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('🚨 WANTED 🚨')
            .setDescription(`**Suspect:** ${username}\n**Crime:** ${crime}\n**Last Seen:** Unknown`)
            .setFooter({ text: 'Use !lastseen to update last known location.' });

        message.channel.send({ embeds: [embed] });
    }
};
