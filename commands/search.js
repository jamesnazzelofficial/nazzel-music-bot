const { YoutubeSearchAPI } = require('youtube-search-api');

module.exports = {
  name: 'search',
  description: 'Searches for a song on YouTube',
  async execute(message, args, client) {
    const searchString = args.join(' ');
    
    // Create a new instance of the YoutubeSearchAPI
    const youtube = new YoutubeSearchAPI(client.config.youtubeAPIKey); // Make sure to replace 'client.config.youtubeAPIKey' with your actual YouTube API key
    
    try {
      // Perform the search
      const result = await youtube.searchVideos(searchString, 1); // Search for 1 video
    
      // Check if any results were found
      if (result && result.result && result.result.items && result.result.items.length > 0) {
        // Get the first video
        const video = result.result.items[0];
        
        // Send the search result to the channel
        message.channel.send(`Found "${video.title}" on YouTube: ${video.link}`);
      } else {
        message.channel.send('No search results found.');
      }
    } catch (error) {
      console.error('Error searching on YouTube:', error);
      message.channel.send('An error occurred while searching on YouTube.');
    }
  },
};
