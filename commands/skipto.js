module.exports = {
    name: 'skipto',
    description: 'Skips to the specified queue position',
    execute(message, args, client) {
      // Your skipto logic goes here
      const queuePosition = args[0];
      if (!queuePosition || isNaN(queuePosition)) {
        return message.reply('Please provide a valid queue position to skip to.');
      }
      message.channel.send(`Skipping to queue position ${queuePosition}...`);
    },
  };
  