const fs = require('fs');
const dataPath = './data.json';

module.exports = {
    name: 'arrest',
    description: 'Logs an arrest and removes a player from the wanted list.',
    execute(message, args) {
        if (args.length < 1) return message.reply('Usage: `!arrest [username]`');

        const username = args[0].toLowerCase(); // Make it case insensitive

        // Ensure data.json exists
        if (!fs.existsSync(dataPath)) {
            fs.writeFileSync(dataPath, JSON.stringify({ wantedList: [], arrestLogs: [] }, null, 2));
        }

        // Load data
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Ensure arrays exist
        if (!Array.isArray(data.wantedList)) data.wantedList = [];
        if (!Array.isArray(data.arrestLogs)) data.arrestLogs = [];

        // Find wanted player
        const wantedIndex = data.wantedList.findIndex(entry => entry.username.toLowerCase() === username);
        if (wantedIndex === -1) return message.reply(`${username} is not on the wanted list.`);

        // Remove from wanted list
        const wantedEntry = data.wantedList.splice(wantedIndex, 1)[0];

        // Add to arrest logs
        data.arrestLogs.push({
            suspect: wantedEntry.username,
            crime: wantedEntry.crime || "Unknown Crime",
            officer: message.author.username,
            time: new Date().toLocaleString()
        });

        // Save data
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        message.channel.send(`✅ **${wantedEntry.username}** has been arrested and removed from the wanted list.`);
    }
};
