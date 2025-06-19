module.exports = {
  name: 'messageCreate',
  async execute(message, client, config) {
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    let command = client.commands.get(commandName);
    if (!command) {
      for (const [name, cmd] of client.commands) {
        if (cmd.aliases && cmd.aliases.includes(commandName)) {
          command = cmd;
          break;
        }
      }
    }

    if (!command) {
      console.log(`Komut bulunamadı: ${commandName}`);
      return;
    }

    try {
      await command.execute(message, args, client, config);
    } catch (error) {
      console.error(`Komut çalıştırılırken hata oluştu (${commandName}):`, error);
      await message.reply('Komut çalıştırılırken bir hata oluştu!');
    }
  }
};