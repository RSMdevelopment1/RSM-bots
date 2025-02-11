const fs = require('fs');
const dataPath = './promotions.json';

module.exports = {
    name: 'promotionlogs',
    description: 'Shows promotion logs for a user.',
    execute(message, args) {
        const user = message.mentions.users.first();
        if (!user) return message.reply('Please mention a user to check promotions.');

        let promotions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        if (!promotions[user.id] || promotions[user.id].length === 0) {
            return message.reply(`${user.tag} has no promotion history.`);
        }

        let promotionList = promotions[user.id].map((entry, index) =>
            `**${index + 1}.** Promoted to **${entry.newRank}** - *${entry.date}*`
        ).join('\n');

        message.channel.send(`Promotion history for ${user.tag}:\n${promotionList}`);
    }
};
