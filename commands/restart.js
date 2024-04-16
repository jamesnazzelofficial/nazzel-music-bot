module.exports = {
    name: 'restart',
    description: 'Restarts the bot',
    execute(message, args, client) {
      message.channel.send('Restarting the bot...').then(() => {
        console.log('Bot restarting...');
        client.destroy().then(() => {
          process.exit(0); // Exit with code 0 indicating successful restart
        });
      }).catch(console.error);
    },
  };
  