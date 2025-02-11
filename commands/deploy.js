const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'deploy',
    description: 'Sends a deployment embed message and tracks reactions.',
    async execute(message) {
        // Delete the user's command message (!deploy)
        await message.delete().catch(console.error);

        // Create the embed
        const embed = new EmbedBuilder()
            .setColor(0xFF0000) // Red color
            .setDescription(`The HR team has decided to host a deployment. The time limit is **30 minutes**.\n\n**Host:** ${message.author}\n**Game Code:** GreatLARP\n**Reactions Required:** 4+`)
            .setFooter({ text: 'Prepare for deployment!' });

        // Send the message with pings, title, and embed
        const sentMessage = await message.channel.send({
            content: '@everyone <@&1338591422655234120>\n\n# DEPLOYMENT',
            embeds: [embed]
        });

        // Automatically add a ✅ reaction
        await sentMessage.react('✅');

        // Create a reaction filter (only ✅ reactions count)
        const filter = (reaction, user) => reaction.emoji.name === '✅' && !user.bot;

        // Create a reaction collector (wait until 4+ reactions)
        const collector = sentMessage.createReactionCollector({ filter, time: 1800000 }); // 30 min limit

        collector.on('collect', async (reaction) => {
            if (reaction.count >= 5) { // 4+ people + bot’s reaction
                // Stop collecting reactions
                collector.stop();

                // Delete the embed message
                await sentMessage.delete().catch(console.error);

                // Send follow-up message
                message.channel.send('Deployment hosted, please head to the briefing room.');
            }
        });
    }
};
