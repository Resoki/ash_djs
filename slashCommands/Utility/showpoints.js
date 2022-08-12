const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: '../../db/sqlite' });

module.exports = {
  name: "showpoints",
  aliases: ["bdg"],
  category: "Utility",
  description: "Voir les points de soi/ d'un membre",
  usage: `**/showpoints <user>**`,
  ownerOnly: false,
  options: [
    {
        name: "user",
        description: "L'user'!",
        type: 6,
        required: false
    },
],
  run: async (client, interaction, args) => {
    try {
      const user = interaction.options.getUser("user");
      const userCurrent= !user ? interaction.member.user : user;

      const points = await db.get(`pointsTab_${userCurrent.id}`);
      
      const yourPointsEmbed = new client.discord.MessageEmbed()
      .setTitle(`Tes points`)
      .setDescription(`<@${userCurrent.id}>, ${!points ? '**Pas de points !**' : `**${points} Moon Coins**`}`)
      .setColor('59bfff')
      .setThumbnail(userCurrent.displayAvatarURL())
      .setTimestamp()
      return  interaction.reply({ embeds: [yourPointsEmbed]});
    
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **showpoints.js**:\n${err}`);
    }
  },
};