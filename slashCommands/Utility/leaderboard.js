const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: '../../db/data' });

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
      .setColor('59bfff')
      .setTimestamp()

      const tabLeaderboard = [];
      let count = 0;
      let isFinish = false;
      interaction.guild.members.fetch()
      .then(async(members)=> {
        members.forEach(async(element, index) => {
          count ++
          const points = await db.get(`pointsTab_${element.user.id}`)
          if(!points) return;
          
          if(points){
            await tabLeaderboard.push({
              name: `${element.user.username}#${element.user.discriminator}`,
              id: element.user.id,
              points: points
            })
          }
        });
      }).then(async()=> {   
          await tabLeaderboard.sort((a, b)=> {
            return a.points - b.points;
          }).reverse()
            .forEach(async(element, index)=> {
            if(index+1 == tabLeaderboard.length) {
               isFinish = true;
            }
            if(index > 10) return;
            console.log(tabLeaderboard)
            if(index+1 === 1) {
              return yourPointsEmbed.addField(`🥇`, `<@${element.id}> - **${element.points} Moon Coins**`)
            }
            if(index+1 === 2) {
              return yourPointsEmbed.addField(`🥈`, `<@${element.id}> - **${element.points} Moon Coins**`)
            }
            if(index+1 === 3) {
              return yourPointsEmbed.addField(`🥉`, `<@${element.id}> - **${element.points} Moon Coins**`)
            }
            await yourPointsEmbed.addField(`#${index+1}`, `<@${element.id}> - **${element.points} Moon Coins**`)
            await yourPointsEmbed.setDescription(`**${count} membres** dans le classement, les 10 premiers affichés ici.`)
          })
        })
        if(!isFinish) {
          await setTimeout(async()=> {
            console.log('wait....')
            if(isFinish) {
              return  interaction.reply({ embeds: [yourPointsEmbed]});
            }
          },2000)
        }   
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **leaderboard.js**:\n${err}`);
    }
  },
};