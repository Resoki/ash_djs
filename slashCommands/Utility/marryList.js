const db = require('quick.db');
module.exports = {
  name: "marrylist",
  aliases: ["bdg"],
  category: "Utility",
  description: "Voir la liste des mariages",
  usage: `**/marrylist**`,
  ownerOnly: false,
  run: async (client, interaction, args) => {
    try {
      const user = interaction.options.getUser("user");
      const marryList =    await db.get('marryList')
      console.log(marryList)

        const marryEmbed = new client.discord.MessageEmbed()
        .setTitle(`Info !`)
        .setDescription(`La liste des unions au sein du serveur`)
        .setColor('59bfff')

        marryList.forEach(async(element, index) => {
            await marryEmbed.addField(`#${index+1}`, `${element.name}, ${element.date}`);
          });
    
        
        setTimeout(async()=> {
            await interaction.reply({ embeds: [marryEmbed]});
        },2000)
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **badge.js**:\n${err}`);
    }
  },
};