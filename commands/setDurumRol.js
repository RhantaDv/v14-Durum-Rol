const CroxyDB = require('croxydb');

module.exports = {
  name: 'durumrol-ayarla',
  async execute(message, args, client, config) {
    if (!message.member.permissions.has('ManageRoles')) {
      return message.reply('Bu komutu kullanmak için rol yönetme izniniz olmalı!');
    }

    if (args.length < 2) {
      return message.reply(`Kullanım: \`${config.prefix}durumrol-ayarla "Durum Mesajı" @rol\``);
    }

    const durumMesaj = args[0].replace(/"/g, '');
    const rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

    if (!rol) {
      return message.reply('Geçerli bir rol belirtmelisiniz!');
    }

    await CroxyDB.set(`durumRol_${message.guild.id}`, { durum: durumMesaj, rolId: rol.id });
    await message.reply(`Durum rolü ayarlandı: **${durumMesaj}** durumuna **${rol.name}** rolü verilecek.`);
  }
};