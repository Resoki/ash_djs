const db = require('quick.db')

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
      if(tab != null ){
        tab.find(async(element, index) =>  {
        if(element.name.startsWith(`<@${interaction.member.user.id}>`)){
          console.log(element.name)
          let money = db.all()
          .map(entry => entry.ID)
          .filter(id => id.startsWith(`<@${interaction.member.user.id}>`))
          console.log(money)
           money.forEach(db.delete)
      
           
        }
        })
      
        return interaction.reply(`Divorce OK !`);
      }


    
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **marry.js**:\n${err}`);
    }
  },
}