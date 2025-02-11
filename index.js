const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
require("./server.js"); // Keeps bot online in Replit

// Check if token is loaded
if (!process.env.BOT_TOKEN) {
    console.error("❌ ERROR: No bot token found in .env file.");
    process.exit(1); // Stop the bot if no token is found
} else {
    console.log("✅ Bot token loaded successfully.");
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

// Load commands from "commands" folder
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Bot Ready Event
client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    client.user.setActivity('the old kanye', { type: 'i miss' }); // Default Status
});

// Handle Message Commands (!command)
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    try {
        client.commands.get(commandName).execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
    }
});

// Bot Login
client.login(process.env.BOT_TOKEN).catch(err => {
    console.error("❌ ERROR: Invalid bot token! Check your .env file.");
});
