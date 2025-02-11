const fs = require('fs');
const dataPath = './data.json';

module.exports = {
    name: 'wantedlist',
    description: 'Shows all currently wanted players.',
    execute(message) {
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        if (data.wantedList.length === 0) return message.channel.send('There are currently no wanted individuals.');

        let list = '**WANTED LIST:**\n';
        data.wantedList.forEach((entry, i) => {
            list += `\n**${i + 1}.** ${entry.username} - ${entry.crime} (Last Seen: ${entry.lastSeen})`;
        });

        message.channel.send(list);
    }
};
