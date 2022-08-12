const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: 'db/data.sqlite' });

module.exports = {
  name: "addpoints",
  aliases: ["bdg"],
  category: "Utility",
  description: "Ajouter des points à un membre",
  usage: `**/addpoints <number>**`,
  ownerOnly: false,
  options: [
    {
        name: "user",
        description: "L'user à qui ajouter des points",
        type: 6,
        required: true
    },
    {
        name: "points",
        description: "Le nombre de Moon Coins que tu veux ajouter !",
        type: 10,
        required: true
    }
],
  run: async (client, interaction, args) => {
    try {
      if(!interaction.isCommand()) return;
      const permission = interaction.member.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS);
      
      if (permission)
        return interaction.reply({content:`❌ | Tu n'as pas la permission d'utiliser cette commande !`, ephemeral: true});

      const user = interaction.options.getUser("user");
      const pointsInte = interaction.options.getNumber("points");

        await db.add(`pointsTab_${user.id}`, pointsInte);

        const solde =  await db.get(`pointsTab_${user.id}`);

         const addPhraseEmbed = new client.discord.MessageEmbed()
         .setAuthor(`${interaction.member.user.username}#${interaction.member.user.discriminator}`, interaction.member.displayAvatarURL())
         .addField('Utilisateur', `<@${user.id}>`)
         .addField('Quantité ajoutée', `**${pointsInte}**`, inline= true)
         .addField('Nouveau Solde', `**${solde}**`, inline = true)
         .setColor('59bfff')
         .setTimestamp()
 
         return interaction.reply({ embeds: [addPhraseEmbed]});
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **addpoints.js**:\n${err}`, ephemeral= true);
    }
  },
};