const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const dataPath = './data.json';

module.exports = {
    name: 'infoadd',
    description: 'Adds additional info to a player profile.',
    execute(message, args) {
        if (args.length < 2) return message.reply('Usage: `!infoadd [username] [extra info]`');

        const username = args[0];
        const extraInfo = args.slice(1).join(' ');

        // Load data
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        data.playerInfo = data.playerInfo || [];
        const existingIndex = data.playerInfo.findIndex(entry => entry.username.toLowerCase() === username.toLowerCase());

        if (existingIndex !== -1) {
            data.playerInfo[existingIndex].info += ` | ${extraInfo}`;
        } else {
            data.playerInfo.push({ username, info: extraInfo });
        }

        // Save data
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        // Send confirmation
        const embed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle('Additional Info Added')
            .addFields({ name: 'Username:', value: username, inline: false })
            .addFields({ name: 'Updated Info:', value: data.playerInfo[existingIndex]?.info || extraInfo, inline: false })
            .setFooter({ text: 'Additional info successfully added' });

        message.channel.send({ embeds: [embed] });
    }
};
