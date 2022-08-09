
module.exports = {
  name: "say",
  aliases: ["bdg"],
  category: "Utility",
  description: "Faire parler le bot",
  usage: `**/say <word>**`,
  ownerOnly: false,
  options: [
    {
        name: "word",
        description: "Le mot que le bot doit répeter",
        type: 3,
        required: false
    }
],
  run: async (client, interaction, args) => {
    try {
     const word = interaction.options.getString('word');
    return interaction.reply(word);
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **say.js**:\n${err}`);
    }
  },
};