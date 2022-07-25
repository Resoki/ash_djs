const db = require('quick.db');
module.exports = {
  name: "leaderboard",
  aliases: ["bdg"],
  category: "Utility",
  description: "Voir le classement du serveur",
  usage: `**/leaderboard**`,
  ownerOnly: false,
  run: async (client, interaction, args) => {
    try {
      const yourPointsEmbed = new client.discord.MessageEmbed()
      .setTitle(`LeaderBoard`)
      .setDescription(`Classement`)
      .setColor('59bfff')
      .setTimestamp()

      const tabLeaderboard = [];
      interaction.guild.members.fetch()
      .then(async(members)=> {
        members.forEach(async(element, index) => {
          const points = await db.get(`pointsTab_${element.user.id}`)
          if(!points)  return;
          
          if(points){
            await tabLeaderboard.push({
              name: `${element.user.username}#${element.user.discriminator}`,
              points: points
            })

            tabLeaderboard.sort((a, b)=> {
              return a.points - b.points;
          }).reverse()
          }
        });

      }).then(()=> {
        tabLeaderboard.forEach(async(element, index)=> {
          yourPointsEmbed.addField(`#${index+1}`, `${element.name} - **${element.points} pts**`)
        })
      })
        setTimeout(async()=> {
          return  interaction.reply({ embeds: [yourPointsEmbed]});
        },2200)
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **showpoints.js**:\n${err}`);
    }
  },
};