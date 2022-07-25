const db = require('quick.db');
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
        required: false
    }
],
  run: async (client, interaction, args) => {
    try {
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
        
        await interaction.reply({ embeds: [addPhraseEmbed]});
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **addphrase.js**:\n${err}`);
    }
  },
};