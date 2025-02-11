const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const dataPath = './data.json';

module.exports = {
    name: 'lastseen',
    description: 'Updates last seen location for a wanted person.',
    async execute(message, args) {
        if (args.length < 2) return message.reply('Usage: `!lastseen [username] [location]`');

        const username = args[0];
        const location = args.slice(1).join(' ');

        let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Find the wanted suspect
        const wantedIndex = data.wantedList.findIndex(entry => entry.username.toLowerCase() === username.toLowerCase());
        if (wantedIndex === -1) return message.reply(`${username} is not on the wanted list.`);

        // Update last seen location
        data.wantedList[wantedIndex].lastSeen = location;
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        // Update the embed message
        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('🚨 WANTED 🚨')
            .setDescription(`**Suspect:** ${data.wantedList[wantedIndex].username}\n**Crime:** ${data.wantedList[wantedIndex].crime}\n**Last Seen:** ${data.wantedList[wantedIndex].lastSeen}`)
            .setFooter({ text: 'Use !lastseen to update last known location.' });

        message.channel.send({ embeds: [embed] });
    }
};
