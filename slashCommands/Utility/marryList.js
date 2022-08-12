const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: '../../db/data' });

module.exports = {
  name: "marrylist",
  aliases: ["bdg"],
  category: "Utility",
  description: "Voir la liste des mariages",
  usage: `**/marrylist <user>**`,
  ownerOnly: false,
  options: [
    {
        name: "user",
        description: "L'user que vous souhaitez voir",
        type: 6,
        required: false
    }
],
  run: async (client, interaction, args) => {
    try {
      const user = interaction.options.getUser('user');
      const UserId = !user ? interaction.member.user.id : user.id
      const marryList = await db.get(`marryList_${UserId}`)
      
      if(marryList === null || marryList.length === 0) return interaction.reply(`<@${UserId}> n'est pas marié !`)

        const marryEmbed = new client.discord.MessageEmbed()
        .setTitle(`Info !`)
        .setDescription(`Les unions de <@${!user ? interaction.member.user.id : user.id}>`)
        .setColor('59bfff')
        .setTimestamp()
        .setThumbnail(`${!user ? interaction.member.user.displayAvatarURL() : user.displayAvatarURL()}`)

        marryList.forEach(async(element, index) => {
            await marryEmbed.addField(`#${index+1}`, `${element.name}, ${element.date}`);
            if(index+1 === marryList.length){
              await interaction.reply({ embeds: [marryEmbed]});
            }
        })
    }
    catch(err){
      console.log(err)
      return interaction.channel.send(`❌ | Une erreur a eu lieu **marryList.js**:\n${err}`);
    }
  },
};