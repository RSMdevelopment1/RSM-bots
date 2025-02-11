const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a user from the server.',
    execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('You do not have permission to ban members.');
        }

        const user = message.mentions.members.first();
        if (!user) return message.reply('Please mention a user to ban.');

        const reason = args.slice(1).join(' ') || 'No reason provided';
        user.ban({ reason })
            .then(() => message.channel.send(`${user.user.tag} has been banned for: ${reason}`))
            .catch(error => message.reply('Failed to ban user. ' + error));
    }
};
