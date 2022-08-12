const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: 'db/data.sqlite' });

module.exports = {
  name: "resetpointsall",
  aliases: ["bdg"],
  category: "Utility",
  description: "Reset tous les points de tout le monde",
  usage: `**/resetpointsall**`,
  ownerOnly: false,
  run: async (client, interaction, args) => {
    try {
      const permission = interaction.member.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS);
       if (!permission) return interaction.reply({content:`❌ | Tu n'as pas la permission d'utiliser cette commande !`, ephemeral: true});

        let money = db.all()


        if(!await money.length === 0) return interaction.reply('Pas de points à reset');

         money.map(entry => entry.ID)
        .filter(id => id.startsWith(`pointsTab_`))
         money.forEach(db.delete)

         const resetEmbed = new client.discord.MessageEmbed()
         .addField('Quantité reset pour tout le monde', `REUSSI - ✅`, inline= true)
         .setColor('59bfff')
         .setTimestamp()
 
        return interaction.reply({ embeds: [resetEmbed]});
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **resetpoints.js**:\n${err}`);
    }
  },
};