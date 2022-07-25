const db = require('quick.db');
module.exports = {
  name: "showpoints",
  aliases: ["bdg"],
  category: "Utility",
  description: "Ajouter des points à un membre",
  usage: `**/addpoints <numbetr>**`,
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

      if(!user) {
        const points = await db.get(`pointsTab_${interaction.member.user.id}`);
        
        const yourPointsEmbed = new client.discord.MessageEmbed()
        .setTitle(`Tes points`)
        .setDescription(`<@${interaction.member.user.id}>, ${!points ? '**Pas de points !**' : `**${points} points**`}`)
        .setColor('59bfff')
        .setThumbnail(interaction.member.displayAvatarURL())
        .setTimestamp()
        return  interaction.reply({ embeds: [yourPointsEmbed]});
      }

      const points = await db.get(`pointsTab_${user.id}`);
        
      const yourPointsEmbed = new client.discord.MessageEmbed()
      .setTitle(`Tes points`)
      .setDescription(`<@${user.id}>, ${!points ? '**Pas de points !**' : `**${points} points**`}`)
      .setColor('59bfff')
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp()
      return  interaction.reply({ embeds: [yourPointsEmbed]});
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **showpoints.js**:\n${err}`);
    }
  },
};