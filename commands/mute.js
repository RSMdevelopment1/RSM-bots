const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Mutes a user.',
    execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return message.reply('You do not have permission to mute members.');
        }

        const user = message.mentions.members.first();
        if (!user) return message.reply('Please mention a user to mute.');

        const time = args[1] || '10m'; // Default to 10 minutes if no time given
        user.timeout(10 * 60 * 1000, 'Muted by moderator')
            .then(() => message.channel.send(`${user.user.tag} has been muted for ${time}.`))
            .catch(error => message.reply('Failed to mute user. ' + error));
    }
};
