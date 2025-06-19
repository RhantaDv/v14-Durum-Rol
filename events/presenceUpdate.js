const { EmbedBuilder } = require('discord.js');
const CroxyDB = require('croxydb');

module.exports = {
  name: 'presenceUpdate',
  async execute(oldPresence, newPresence, client) {
    const member = newPresence.member;
    const guild = member.guild;
    const durumRol = await CroxyDB.get(`durumRol_${guild.id}`);
    
    if (!durumRol) return;

    const { durum, rolId } = durumRol;
    const rol = guild.roles.cache.get(rolId);
    if (!rol) return;

    const status = newPresence.activities.some(activity => activity.state && activity.state.includes(durum));
    const logChannel = await CroxyDB.get(`logChannel_${guild.id}`);
    const logChannelObj = logChannel ? guild.channels.cache.get(logChannel) : null;
    const currentDate = new Date().toLocaleString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });

    if (status) {
      if (!member.roles.cache.has(rolId)) {
        await member.roles.add(rolId).catch(console.error);
        
        if (logChannelObj) {
          const embed = new EmbedBuilder()
            .setTitle('Durum Rolü Eklendi')
            .addFields(
              { name: 'Durumu Alan', value: `${member}`, inline: true },
              { name: 'Verilen Rol', value: `${rol.name}`, inline: true },
              { name: 'Aldığı Tarih', value: currentDate, inline: true }
            )
            .setColor('#00ff00')
            .setTimestamp();
          await logChannelObj.send({ embeds: [embed] });
        }
      }
    } else {
      if (member.roles.cache.has(rolId)) {
        await member.roles.remove(rolId).catch(console.error);
        
        if (logChannelObj) {
          const embed = new EmbedBuilder()
            .setTitle('Durum Rolü Kaldırıldı')
            .addFields(
              { name: 'Durumu Çıkartan', value: `${member}`, inline: true },
              { name: 'Alınan Rol', value: `${rol.name}`, inline: true },
              { name: 'Çıkarttığı Tarih', value: currentDate, inline: true }
            )
            .setColor('#ff0000')
            .setTimestamp();
          await logChannelObj.send({ embeds: [embed] });
        }
      }
    }
  }
};