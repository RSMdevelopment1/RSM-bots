const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server.',
    execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply('You do not have permission to kick members.');
        }

        const user = message.mentions.members.first();
        if (!user) return message.reply('Please mention a user to kick.');

        const reason = args.slice(1).join(' ') || 'No reason provided';
        user.kick(reason)
            .then(() => message.channel.send(`${user.user.tag} has been kicked for: ${reason}`))
            .catch(error => message.reply('Failed to kick user. ' + error));
    }
};
