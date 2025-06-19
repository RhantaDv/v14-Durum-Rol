const { EmbedBuilder } = require('discord.js');
const CroxyDB = require('croxydb');

module.exports = {
  name: 'durumrol-status',
  async execute(message, args, client, config) {
    if (!message.member.permissions.has('ManageRoles')) {
      return message.reply('Bu komutu kullanmak için rol yönetme izniniz olmalı!');
    }

    const durumRol = await CroxyDB.get(`durumRol_${message.guild.id}`);
    const logChannel = await CroxyDB.get(`logChannel_${message.guild.id}`);
    const rol = durumRol ? message.guild.roles.cache.get(durumRol.rolId) : null;
    const memberCount = rol ? message.guild.members.cache.filter(m => m.roles.cache.has(durumRol.rolId)).size : 0;

    const embed = new EmbedBuilder()
      .setTitle('Durum Sistemi Durumu')
      .addFields(
        { name: 'Durum-Rol Sistemi', value: durumRol ? 'Açık' : 'Kapalı', inline: true },
        { name: 'Durum-Log Sistemi', value: logChannel ? 'Açık' : 'Kapalı', inline: true },
        { name: 'Rolü Alan Kişi Sayısı', value: memberCount.toString(), inline: true }
      )
      .setColor('#0099ff')
      .setTimestamp();
    await message.channel.send({ embeds: [embed] });
  }
};