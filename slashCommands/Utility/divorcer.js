const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: "divorce",
  aliases: ["bdg"],
  category: "Utility",
  description: "Divorcer avec son/sa marié(e)",
  usage: `**/divorce**`,
  ownerOnly: false,
  run: async (client, interaction, args) => {
    try {
      /*if(user.id === interaction.member.user.id){
        return interaction.reply(`Tu ne peux pas te marier avec toi même !`)
      }*/
      const tab = await db.get('marryList');
      if(!tab) return interaction.reply(`Pas de marié sur le serveur !`)
      
        const treatment = await db.get('marryList');
        console.log(treatment)
        treatment.forEach(async(element)=> {
          if(element.name.startsWith(`<@${interaction.member.user.id}>`)){
            await db.pull(element.name, element.date).then((res)=> console.log('res', res)).catch((err)=> console.error(err))
            console.log(`${element.name} deleted`)
            return interaction.reply(`Divorce OK !`);
          }
        });
    
        const treatmenta = await db.get('marryList');
        console.log(treatmenta)
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **divorce.js**:\n${err}`);
    }
  },
}