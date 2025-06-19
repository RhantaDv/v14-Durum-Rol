const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['yardım'],
  async execute(message, args, client, config) {
    const embed = new EmbedBuilder()
      .setTitle('Yardım Menüsü')
      .setDescription('Durum Rol Botu Komutları')
      .addFields(
        { name: `${config.prefix}durumrol-ayarla`, value: `Durum rolünü ayarlar. Örnek: \`${config.prefix}durumrol-ayarla "İstediğiniz Mesaj" @verified\`` },
        { name: `${config.prefix}durumrol-kapat`, value: 'Durum rol sistemini kapatır.' },
        { name: `${config.prefix}durumrol-log`, value: `Log kanalını ayarlar. Örnek: \`${config.prefix}durumrol-log #log-kanalı\`` },
        { name: `${config.prefix}durumrol-log-kapat`, value: 'Log sistemini kapatır.' },
        { name: `${config.prefix}durumrol-status`, value: 'Durum-rol ve Durum-log sistemlerinin durumunu ve rolü alan kişi sayısını gösterir.' }
      )
      .setColor('#0099ff')
      .setTimestamp();
    await message.channel.send({ embeds: [embed] });
  }
};