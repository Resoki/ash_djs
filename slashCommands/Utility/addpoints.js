const db = require('quick.db');
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
        description: "L'user'!",
        type: 6,
        required: false
    },
    {
        name: "points",
        description: "Le nombre de point que tu veux ajouter !",
        type: 10,
        required: false
    }
],
  run: async (client, interaction, args) => {
    try {
      const permission = interaction.member.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS);
      
      if (!permission)
        return interaction.reply(`❌ | Tu n'as pas la permission d'utiliser cette commande !`);

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
 
        await interaction.reply({ embeds: [addPhraseEmbed]});
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **addpoints.js**:\n${err}`);
    }
  },
};