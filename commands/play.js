const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const config = require('./config');

module.exports = {
  name: 'play',
  description: 'Play a song',
  async execute(message, args, client) {
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Play Command')
      .setDescription('This command plays a song.');

    const buttonRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('play_button')
          .setLabel('Play')
          .setStyle('PRIMARY'),
      );

    const msg = await message.channel.send({ embeds: [embed], components: [buttonRow] });

    const filter = interaction => interaction.customId === 'play_button' && interaction.user.id === message.author.id;

    const collector = msg.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async interaction => {
      await interaction.deferUpdate();

      // Your play command logic here
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        msg.edit({ components: [] }); // Remove buttons after timeout
      }
    });
  },
};
