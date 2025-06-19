const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client, config) {
    console.log(`${client.user.tag} aktif!`);
    client.user.setStatus(config.status || 'online');
    if (config.ready) {
      client.user.setActivity(config.ready, { type: ActivityType.Playing });
    }
  }
};