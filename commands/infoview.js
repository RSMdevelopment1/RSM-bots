const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const dataPath = './data.json';

module.exports = {
    name: 'infoview',
    description: 'View stored info of a player.',
    execute(message, args) {
        if (args.length < 1) return message.reply('Usage: `!infoview [username]`');

        const username = args[0];

        // Load data
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Check if player info exists
        const playerInfo = data.playerInfo?.find(entry => entry.username.toLowerCase() === username.toLowerCase());

        if (!playerInfo) return message.reply(`No info found for **${username}**.`);

        // Send embed with player info
        const embed = new EmbedBuilder()
            .setColor(0x2ecc71)
            .setTitle('Player Information')
            .addFields({ name: 'Username:', value: playerInfo.username, inline: false })
            .addFields({ name: 'Info:', value: playerInfo.info, inline: false })
            .setFooter({ text: 'Stored player info' });

        message.channel.send({ embeds: [embed] });
    }
};
