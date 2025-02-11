const fs = require('fs');
const dataPath = './infractions.json';

module.exports = {
    name: 'infractions',
    description: 'Shows a user\'s infractions.',
    execute(message, args) {
        const user = message.mentions.users.first();
        if (!user) return message.reply('Please mention a user to check infractions.');

        let infractions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        if (!infractions[user.id] || infractions[user.id].length === 0) {
            return message.reply(`${user.tag} has no infractions.`);
        }

        let infractionList = infractions[user.id].map((entry, index) =>
            `**${index + 1}.** ${entry.reason} - *${entry.date}*`
        ).join('\n');

        message.channel.send(`Infractions for ${user.tag}:\n${infractionList}`);
    }
};
