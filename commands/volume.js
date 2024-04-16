const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const config = require('./config');

module.exports = {
  name: 'volume',
  description: 'Adjust the volume of the currently playing song',
  async execute(message, args, client) {
    const player = client.player.get(message.guild.id);
    if (!player) return message.reply('There is no music playing!');

    const volume = parseInt(args[0]);
    if (isNaN(volume) || volume < 0 || volume > 100) return message.reply('Please provide a volume level between 0 and 100.');

    player.setVolume(volume);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Volume Changed')
      .setDescription(`Volume set to ${volume}%`)
      .setTimestamp()
      .setFooter('Nazzel Music');

    message.channel.send({ embeds: [embed] });
  },
};
