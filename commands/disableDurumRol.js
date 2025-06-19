const CroxyDB = require('croxydb');

module.exports = {
  name: 'durumrol-kapat',
  async execute(message, args, client, config) {
    if (!message.member.permissions.has('ManageRoles')) {
      return message.reply('Bu komutu kullanmak için rol yönetme izniniz olmalı!');
    }

    await CroxyDB.delete(`durumRol_${message.guild.id}`);
    await message.reply('Durum rol sistemi kapatıldı.');
  }
};