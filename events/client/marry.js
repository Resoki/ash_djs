const db = require('quick.db');
const global = require('../../config')
module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
      try {
        if(!interaction.isButton()) return;
        if(interaction.customId === 'marry-yes') {
          const userId = interaction.message.embeds[0].footer.text
          const marryNames = `<@${interaction.user.id}> & <@${userId}>`;
          const channel = client.channels.cache.find((ch) => ch.id === global.channelMessages);
          
          const tab = await db.get('marryList');
          if(tab != null && tab.find((element) => element.name == marryNames)){
            return interaction.reply(`Tu es déjà marié avec cette personne !`);
          }

          const currentDate = new Date().toLocaleDateString();
 
          const marryEmbed = new client.discord.MessageEmbed()
          .setTitle(`L'amour c'est magnifique !`)
          .setDescription(`Felicitation à <@${interaction.user.id}> & <@${userId}> pour leur union ! ${currentDate}`)
          .setColor('59bfff')
          .setThumbnail('https://static.vecteezy.com/system/resources/previews/001/187/712/non_2x/heart-just-married-png.png')
  
  
          await db.push('marryList', {
            name: marryNames,
            date: currentDate
          })  
          await interaction.reply('Feliciation !')
          
          return channel.send({ embeds: [marryEmbed]});
        }

        if(interaction.customId === 'marry-no') {
          const userId = interaction.message.embeds[0].footer.text
          const guild = client.guilds.cache.get(global.guildID);
          const member = guild.members.cache.get(userId);
          member.send(`<@${interaction.user.id}> vient de refuser ta demande en mariage`)
        }
          
      } catch (e) {
          return console.log(e);
      }
  }
}