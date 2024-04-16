const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const config = require('./config');

module.exports = {
  name: 'maintenance',
  description: 'Enable or disable maintenance mode for the bot',
  async execute(message, args, client) {
    if (!config.ownerId.includes(message.author.id)) return message.reply('Only the bot owner can use this command.');

    const action = args[0];
    if (!action) return message.reply('Please specify whether to enable or disable maintenance mode.');

    if (action === 'enable') {
      if (client.maintenanceMode) return message.reply('Maintenance mode is already enabled.');

      client.maintenanceMode = true;
      client.user.setPresence({ status: 'invisible' });
      client.player.stopAll(message.guild.id);

      const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Maintenance Mode Enabled')
        .setDescription('The bot is now in maintenance mode.')
        .setTimestamp()
        .setFooter('Nazzel Music Bots');

      message.channel.send({ embeds: [embed] });
    } else if (action === 'disable') {
      if (!client.maintenanceMode) return message.reply('Maintenance mode is already disabled.');

      client.maintenanceMode = false;
      client.user.setPresence({ status: 'online' });

      const embed = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Maintenance Mode Disabled')
        .setDescription('The bot is now out of maintenance mode.')
        .setTimestamp()
        .setFooter('Nazzel Music Bots');

      message.channel.send({ embeds: [embed] });
    } else {
      message.reply('Invalid action. Please specify either "enable" or "disable".');
    }
  },
};
