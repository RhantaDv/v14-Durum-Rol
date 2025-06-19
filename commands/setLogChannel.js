const CroxyDB = require('croxydb');

module.exports = {
  name: 'durumrol-log',
  async execute(message, args, client, config) {
    if (!message.member.permissions.has('ManageRoles')) {
      return message.reply('Bu komutu kullanmak için rol yönetme izniniz olmalı!');
    }

    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply(`Kullanım: \`${config.prefix}durumrol-log #log-kanalı\``);
    }

    await CroxyDB.set(`logChannel_${message.guild.id}`, channel.id);
    await message.reply(`Log kanalı <#${channel.id}> olarak ayarlandı.`);
  }
};