const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: '../../db/sqlite' });

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
      if(!user) return interaction.reply('Tu dois préciser un membre !');
      //if(user.id === interaction.member.user.id){
      //  return interaction.reply({content:`**Tu ne peux pas te marier avec toi même !**`, ephemeral: true});
   //   }
      const marryNames = `<@${interaction.member.user.id}> & <@${user.id}>`
      const tab = await db.get(`marryList_${interaction.member.user.id}`);
      if(tab != null && tab.find((element) => element.name == marryNames)){
        return interaction.reply({content:`Tu es déjà marié avec cette personne !**`, ephemeral: true});
      }

      const marryEmbed = new client.discord.MessageEmbed()
      .setTitle(`${interaction.member.user.username} a demandé ${user.username} en mariage`)
      .setDescription(`Un mariage est un engagement mutuel. Il est contracté dans le sens le plus profond à l'exclusion de tous les autres. Avant de declarer
      vos voeux les uns aux autres, jeveux vous entendre confirmer que c'est votre intention de vous marier aujourd'hui\n**${user.username}**, voulez vous
      epouser **${interaction.member.user.username}**`)
      .setColor('59bfff')
      .setThumbnail('https://static.vecteezy.com/system/resources/previews/001/187/712/non_2x/heart-just-married-png.png')
      .setFooter({ text: `${interaction.member.user.id}`, iconURL: `${user.displayAvatarURL()}` });

      const row = new client.discord.MessageActionRow()
      .addComponents(
          new client.discord.MessageButton()
          .setStyle("SECONDARY")
          .setLabel("Oui")
          .setCustomId("marry-yes"),

          new client.discord.MessageButton()
          .setStyle("SECONDARY")
          .setLabel("Non")
          .setCustomId("marry-no")
      );

      await interaction.reply(`Une demande de mariage a été envoyé en privé à <@${user.id}>`, ephemeral = true);
      return user.send({embeds: [marryEmbed], components: [row]});
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **marry.js**:\n${err}`);
    }
  },
}