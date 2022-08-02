const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: "marrylist",
  aliases: ["bdg"],
  category: "Utility",
  description: "Voir la liste des mariages",
  usage: `**/marrylist**`,
  ownerOnly: false,
  run: async (client, interaction, args) => {
    try {
      const marryList = await db.get('marryList')
      if(!marryList) return interaction.reply(`Il n'y a pas de marié(e) sur le serveur !`)

        const marryEmbed = new client.discord.MessageEmbed()
        .setTitle(`Info !`)
        .setDescription(`La liste des unions au sein du serveur`)
        .setColor('59bfff')

        marryList.forEach(async(element, index) => {
            await marryEmbed.addField(`#${index+1}`, `${element.name}, ${element.date}`);
            if(index+1 === marryList.length){
              await interaction.reply({ embeds: [marryEmbed]});
            }
        })
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **marryList.js**:\n${err}`);
    }
  },
};