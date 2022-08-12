const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: 'db/data.sqlite' });

module.exports = {
  name: "divorce",
  aliases: ["bdg"],
  category: "Utility",
  description: "Divorcer avec son/sa marié(e)",
  usage: `**/divorce**`,
  ownerOnly: false,
  options: [
    {
        name: "user",
        description: "L'user avec qui tu souhaite divorcer",
        type: 6,
        required: true
    }
],
  run: async (client, interaction, args) => {
    try {
      const user = interaction.options.getUser('user')
  //if(user.id === interaction.member.user.id){
    //    return interaction.reply({content: `Tu ne peux pas te marier avec toi même !`, ephemeral: true})
 //     }
      const tabInteractionMember = await db.get(`marryList_${interaction.member.user.id}`);
      console.log(tabInteractionMember)
      const tabUser = await db.get(`marryList_${user.id}`);
      if(!tabInteractionMember || tabInteractionMember.length == 0) return interaction.reply({content: `**Tu ne peux pas divorcer car tu n'es pas marié !**`, ephemeral: true});

      await db.set(`marryList_${interaction.member.user.id}`, []);
      await db.set(`marryList_${user.id}`, []);

      const newTabMember =  [];
  
      tabInteractionMember.forEach(async(element)=> {
          if(!element.name.includes(`<@${user.id}>`)){
            console.log('cc')
            newTabMember.push({name: element.name, date: element.date});
          }

          if(element.name.includes(`<@${user.id}>`)){
            await interaction.member.send({content:`<@${interaction.member.user.id}> Tu viens de divorcer avec <@${user.id}>`, ephemeral: true});
          }

          await db.set(`marryList_${interaction.member.user.id}`, newTabMember);
        });
        const newTabUser =  [];
        tabUser.forEach(async(element)=> {
          if(!element.name.includes(`<@${user.id}>`)){
            newTabUser.push({name: element.name, date: element.date});
          }

          if(element.name.includes(`<@${user.id}>`)){
            console.log(`${element.name} deleted`)
            // await interaction.channel.send(`<@${user.id}>, <@${interaction.member.user.id}> vien de divorcer avec toi !`);
          }
          await db.set(`marryList_${user.id}`, newTabUser);
        });

        const embedDivorce = new client.discord.MessageEmbed()
        .setTitle(`${interaction.member.user.username} & ${user.username} ont divorcé !`)
        .setDescription(`<@${interaction.member.user.id}>, vous avez divorcé !`)
        .setTimestamp()
        .setColor('RED')

        return interaction.reply({embeds: [embedDivorce]});
    }
    catch(err){
      console.log(err)
      return interaction.channel.send(`❌ | Une erreur a eu lieu **divorce.js**:\n${err}`);
    }
  },
}