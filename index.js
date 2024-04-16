const express = require('express');
const { Client, Collection, Intents } = require('discord.js');
const mongoose = require('mongoose');
const config = require('./config');
const help = require('./help');

const app = express();
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running!');
});

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
client.commands = new Collection();

// Load commands
const commandFiles = ['play', 'skip', 'search', 'help', 'volume', 'restart', 'shutdown', 'maintenance'];
for (const file of commandFiles) {
  try {
    const command = require(`./${file}.js`);
    client.commands.set(command.name, command);
  } catch (error) {
    console.error(`Error loading command '${file}':`, error);
    // Notify the user about the error
    client.once('ready', async () => {
      const owner = await client.application.owner;
      const user = await client.users.fetch(owner.id);
      user.send(`Error loading command '${file}': ${error.message}`);
    });
  }
}

// MongoDB connection
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process if unable to connect to MongoDB
});

// Ready event
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Message event
client.on('messageCreate', async message => {
  if (!message.guild || message.author.bot) return;

  const args = message.content.slice(config.defaultPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error('Error executing command:', error);
    message.reply('There was an error executing that command!');
  }
});

// Login
client.login(process.env.TOKEN).catch(error => {
  console.error('Error logging in:', error);
  server.close(); // Close the server if unable to log in
});
