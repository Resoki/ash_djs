const { Database } = require("quickmongo");
const db = new Database("mongodb://localhost/quickmongo");

module.exports = {
  name: "marry",
  aliases: ["bdg"],
  category: "Utility",
  description: "Se marier avec un user",
  usage: `**/marry <member>**`,
  ownerOnly: false,
  options: [
    {
        name: "user",
        description: "L'user avec qui se marier",
        type: 6,
        required: false
    }
],
  run: async (client, interaction, args) => {
    try {
      const user = interaction.options.getUser("user");
      if(user.id === interaction.member.user.id){
        return interaction.reply(`Tu ne peux pas te marier avec toi même !`)
      }

        const currentDate = new Date().toLocaleDateString();

        const marryEmbed = new client.discord.MessageEmbed()
        .setTitle(`L'amour c'est magnifique !`)
        .setDescription(`Felicitation à <@${interaction.member.user.id}> & <@${user.id}> pour leur union ! ${currentDate}`)
        .setColor('59bfff')
        .setThumbnail('https://static.vecteezy.com/system/resources/previews/001/187/712/non_2x/heart-just-married-png.png')
        .setFooter({ text: `Marry`, iconURL: `${user.displayAvatarURL()}` });

        const marryNames = `<@${interaction.member.user.id}> & <@${user.id}>`

        const tab = await db.get('marryList');
        if(tab != null && tab.find((element) => element.name == marryNames)){
          return interaction.reply(`Tu es déjà marié avec cette personne !`)
        }
        await db.push('marryList', {
          name: marryNames,
          date: currentDate
        })
        
        await interaction.reply({ embeds: [marryEmbed]});
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **marry.js**:\n${err}`);
    }
  },
}