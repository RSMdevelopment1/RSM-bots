const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const dataPath = './data.json';

module.exports = {
    name: 'info',
    description: 'Updates info on a player.',
    execute(message, args) {
        if (args.length < 2) return message.reply('Usage: `!info [username] [info]`');

        const username = args[0];
        const info = args.slice(1).join(' ');

        // Load data
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Update or add new info
        data.playerInfo = data.playerInfo || [];
        const existingIndex = data.playerInfo.findIndex(entry => entry.username.toLowerCase() === username.toLowerCase());

        if (existingIndex !== -1) {
            data.playerInfo[existingIndex].info = info;
        } else {
            data.playerInfo.push({ username, info });
        }

        // Save data
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        // Send confirmation
        const embed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle('Player Info Updated')
            .addFields({ name: 'Username:', value: username, inline: false })
            .addFields({ name: 'Info:', value: info, inline: false })
            .setFooter({ text: 'Info updated successfully' });

        message.channel.send({ embeds: [embed] });
    }
};
