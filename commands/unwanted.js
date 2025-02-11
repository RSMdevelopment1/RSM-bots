const fs = require('fs');
const dataPath = './data.json';

module.exports = {
    name: 'unwanted',
    description: 'Removes a player from the wanted list.',
    execute(message, args) {
        if (args.length < 1) return message.reply('Usage: `!unwanted [username]`');

        const username = args[0];

        // Load data
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Find and remove user from wanted list
        const wantedIndex = data.wantedList.findIndex(entry => entry.username.toLowerCase() === username.toLowerCase());
        if (wantedIndex === -1) return message.reply(`${username} is not on the wanted list.`);

        data.wantedList.splice(wantedIndex, 1);

        // Save data
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        message.channel.send(`**${username}** has been removed from the wanted list.`);
    }
};
