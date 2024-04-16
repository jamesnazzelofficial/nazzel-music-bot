module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot',
    execute(message, args, client) {
      message.channel.send('Shutting down...').then(() => {
        console.log('Bot shutting down...');
        client.destroy().then(() => {
          process.exit(0); // Exit with code 0 indicating successful shutdown
        });
      }).catch(console.error);
    },
  };
  