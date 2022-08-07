const { Permissions} = require("discord.js");

module.exports = {
    name: "purge",
    usage: '/purge <command>',
    options: [
        {
            name: 'number',
            description: 'Le nombre de message à supprimer',
            type: 10,
            required: true
        }
    ],
    category: "Bot",
    description: "🆑 Purge des messages du serveur !",
    userPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    run: async (client, interaction) => {
      try {
        let amount = interaction.options.getNumber('number');

          if (!amount) return interaction.channel.send("Merci de preciser le nombre de message à supprimer !")
          if (amount > 100 || amount < 1) return interaction.channel.send("Merci de preciser un nombre compris entre 0 et 100 !")
  
          interaction.channel.bulkDelete(amount).catch(err => {
              interaction.channel.send(':x: Dû à la limitation Discord, Je ne peux pas supprimer les messages de plus de 14 jours.') })
  
          let msg = await interaction.channel.send(`\`${amount}\` messages supprimés !`);

          setTimeout(() => {
              msg.delete();
          }, 2000)
      }
      catch(err) {
          return interaction.channel.send(`❌ | A error occured **purge.js**: ${err}`);
      }
    },
};