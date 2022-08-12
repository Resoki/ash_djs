const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: '../../db/data.sqlite' });

module.exports = {
  name: "addphrase",
  aliases: ["bdg"],
  category: "Utility",
  description: "Enregistrer une phrase",
  usage: `**/addphrase <phrase>**`,
  ownerOnly: false,
  options: [
    {
        name: "phrase",
        description: "La phrase que tu veux enregistrer",
        type: 3,
        required: true
    }
],
  run: async (client, interaction, args) => {
    try {
      if(!interaction.isCommand()) return;
      const permission = interaction.member.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS);
      if (!permission)
      return interaction.reply({content:`❌ | Tu n'as pas la permission d'utiliser cette commande !`, ephemeral: true});

      const phrase = interaction.options.getString("phrase");
      const currentDate = new Date().toLocaleDateString();
      const addPhraseEmbed = new client.discord.MessageEmbed()
      .setTitle(`Phrase ajouté !`)
      .setDescription(`<@${interaction.member.user.id}>, ta phrase a été enregistrée:\n **${phrase}**`)
      .setColor('59bfff')
      .setTimestamp()

      await db.push('phrasesList', {
        phrase: phrase,
        date: currentDate
      })
        
      return interaction.reply({ embeds: [addPhraseEmbed]});
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **addphrase.js**:\n${err}`);
    }
  },                                                 
};