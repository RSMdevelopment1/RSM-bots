const fs = require('fs');
const dataPath = './promotions.json';

module.exports = {
    name: 'promote',
    description: 'Promotes a user and logs the promotion.',
    execute(message, args) {
        if (!message.member.permissions.has('ManageRoles')) {
            return message.reply('You do not have permission to promote members.');
        }

        const user = message.mentions.users.first();
        if (!user) return message.reply('Please mention a user to promote.');

        const newRank = args.slice(1).join(' ') || 'No rank specified';

        let promotions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        if (!promotions[user.id]) promotions[user.id] = [];

        promotions[user.id].push({ newRank, date: new Date().toLocaleString() });

        fs.writeFileSync(dataPath, JSON.stringify(promotions, null, 2));

        message.channel.send(`${user.tag} has been promoted to **${newRank}**.`);
    }
};
