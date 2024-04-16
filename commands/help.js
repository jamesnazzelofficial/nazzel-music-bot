const { MessageEmbed } = require('discord.js');
const config = require('./config');

module.exports = {
  name: 'help',
  description: 'Nazzel Music List all available commands',
  execute(message, args, client) {
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Available Commands')
      .setDescription('Here is a list of available commands:')
      .addField(`${config.defaultPrefix}play <song>`, 'Play a song')
      .addField(`${config.defaultPrefix}skip`, 'Skip the currently playing song')
      .addField(`${config.defaultPrefix}search <song>`, 'Search for a song and play it')
      .addField(`${config.defaultPrefix}volume <level>`, 'Adjust the volume of the currently playing song')
      .addField(`${config.defaultPrefix}help`, 'Show this help message')
      .addField(`${config.defaultPrefix}restart`, 'Restart the bot (Owner only)')
      .addField(`${config.defaultPrefix}shutdown`, 'Shutdown the bot (Owner only)')
      .setTimestamp()
      .setFooter('Nazzel Music bots');

    message.channel.send({ embeds: [embed] });
  },
};

if (process.env.PLATFORM === 'replit' || process.env.PLATFORM === 'glitch') {
  module.exports = {
    help: module.exports.help
  };
}
