const fs = require('fs');
const dataPath = './infractions.json';

module.exports = {
    name: 'warn',
    description: 'Warns a user and logs it.',
    execute(message, args) {
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply('You do not have permission to warn members.');
        }

        const user = message.mentions.users.first();
        if (!user) return message.reply('Please mention a user to warn.');

        const reason = args.slice(1).join(' ') || 'No reason provided';

        let infractions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        if (!infractions[user.id]) infractions[user.id] = [];

        infractions[user.id].push({ reason, date: new Date().toLocaleString() });

        fs.writeFileSync(dataPath, JSON.stringify(infractions, null, 2));

        message.channel.send(`${user.tag} has been warned for: ${reason}`);
    }
};
