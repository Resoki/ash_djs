const { MessageEmbed , Permissions} = require("discord.js");

module.exports = {
    name: "kick",
    usage: '/kick <command>',
    options: [
        {
            name: 'user',
            description: 'Le membre que tu souhaites kick',
            type: 6,
            required: true
        },
        {
          name: 'reason',
          description: 'Le raison du kick',
          type: 3,
          required: false
      }
    ],
    category: "Bot",
    description: "🦶🏽 Kick un membre du serveur !",
    userPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    run: async (client, interaction) => {
      try {
        const permission = interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS);
      
        if (!permission)
          return interaction.reply(`❌ | Tu n'as pas la permission d'utiliser cette commande !`);

        const user = interaction.options.getUser('user');
        let member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason');

        await member.kick()
        .then(()=> {
          const embedBan = new MessageEmbed()
          .setTitle('Un membre a été kick !')
          .setDescription(`${member.user.username} a été kick du serveur par <@${interaction.member.user.id}> !\nRaison:${!reason? 'Pas de raison spécifié' : reason}`)
          .setColor('RED');

          return interaction.reply({embeds: [embedBan]}); 
        })      
      }
      catch(err) {
          return interaction.channel.send(`❌ | A error occured **kick.js**: ${err}`);
      }
    },
};