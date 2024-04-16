module.exports = {
    name: 'nowplay',
    description: 'Displays the currently playing song',
    execute(message, args, client) {
      // Your nowplay logic goes here
      message.channel.send('Displaying currently playing song...');
    },
  };
  