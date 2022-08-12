const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: '../../db/sqlite' });

module.exports = {
  name: "removepoints",
  aliases: ["bdg"],
  category: "Utility",
  description: "Retirer des points à un membre",
  usage: `**/removepoints <number>**`,
  ownerOnly: false,
  options: [
    {
        name: "user",
        description: "L'user à qui retirer des points",
        type: 6,
        required: false
    },
    {
        name: "points",
        description: "Le nombre de Moon Coins que tu veux retirer !",
        type: 10,
        required: false
    }
],
  run: async (client, interaction, args) => {
    try {
      const permission = interaction.member.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS);
      if (!permission)
      return interaction.reply({content:`❌ | Tu n'as pas la permission d'utiliser cette commande !`, ephemeral: true});

      const user = interaction.options.getUser("user");
      const pointsInte = interaction.options.getNumber("points");

        await db.add(`pointsTab_${user.id}`, -pointsInte);

        const solde =  await db.get(`pointsTab_${user.id}`);

         const addPhraseEmbed = new client.discord.MessageEmbed()
         .setAuthor(`${interaction.member.user.username}#${interaction.member.user.discriminator}`, interaction.member.displayAvatarURL())
         .addField('Utilisateur', `<@${user.id}>`)
         .addField('Quantité retirée', `**${pointsInte}**`, inline= true)
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