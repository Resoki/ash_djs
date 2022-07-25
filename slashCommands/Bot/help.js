const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    usage: '/help <command>',
    options: [
        {
            name: 'command',
            description: 'Quel commande as tu besoin?',
            type: 3,
            required: false
        }
    ],
    category: "Bot",
    description: "Retourne toutes les commandes !",
    userPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    run: async (client, interaction) => {
        try {
            const commandInt = interaction.options.getString("command");
            if (!commandInt) {

                // Get the slash commands of a Bot category
                const botCommandsList = [];
                readdirSync(`./slashCommands/Bot`).forEach((file) => {
                    const filen = require(`../../slashCommands/Bot/${file}`);
                    const name = `\`${filen.name}\``
                    botCommandsList.push(name);
                });

                // Get the slash commands of a Utility category
                const utilityCommandsList = [];
                readdirSync(`./slashCommands/Utility`).forEach((file) => {
                    const filen = require(`../../slashCommands/Utility/${file}`);
                    const name = `\`${filen.name}\``
                    utilityCommandsList.push(name);
                });


                            // Get the slash commands of a Tickets category
                  const modCommandsList = [];
                  readdirSync(`./slashCommands/Mod`).forEach((file) => {
                      const filen = require(`../../slashCommands/Mod/${file}`);
                      const name = `\`${filen.name}\``
                      modCommandsList.push(name);
                  });
                // This is what it commands when using the command without arguments
                const helpEmbed = new client.discord.MessageEmbed()
                .setTitle(`${client.user.username} 2022`)
                .setDescription(` Hello **<@${interaction.member.id}>**, Je suis le bot d'assistance <@${client.user.id}>.  \nTu peux utiliser \`/help <slash_command>\` pour voir plus d'info des SlashCommands!\n**Total SlashCommands:** ${client.slash.size}`)
                .addField("🤖 - Bot SlashCommands", botCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("🛠 - Utility SlashCommands", utilityCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("🧑‍⚖️ - Mod SlashCommands", modCommandsList.map((data) => `${data}`).join(", "), true)                .setColor(client.config.embedColor)
                .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                interaction.reply({ embeds: [helpEmbed]});
            } else {
                const command = client.slash.get(commandInt.toLowerCase());

                // This is what it sends when using the command with argument and it does not find the command
                if (!command) {
                    interaction.reply({ content: `Il n'y a pas de SlashCommands nommé: "${commandInt}"` });
                } else {

                    // This is what it sends when using the command with argument and if it finds the command
                    let command = client.slash.get(commandInt.toLowerCase());
                    let name = command.name;
                    let description = command.description || "Pas de description précisé !"
                    let usage = command.usage || "Pas d'usage precisé !"
                    let category = command.category || "Pas de catégorie precisé !"

                    let helpCmdEmbed = new client.discord.MessageEmbed()
                    .setTitle(`${client.user.username} Help | \`${(name.toLocaleString())}\` SlashCommand`)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Usage", value: `${usage}` },
                        { name: 'Category', value: `${category}` }
                    )
                    .setColor(client.config.embedColor)
                    .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                    return interaction.reply({ embeds: [helpCmdEmbed] });
                }
        }
    }
    catch(err) {
        return interaction.channel.send(`❌ | Une erreur a eu lieu **help.js**: ${err}`)
    }
    },
};