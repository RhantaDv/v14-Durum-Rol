const { Client, IntentsBitField, ActivityType } = require('discord.js');
const config = require('./config.json');
const CroxyDB = require('croxydb');
const fs = require('fs').promises;
const path = require('path');
// Rhanta
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});
// Rhanta
client.commands = new Map();
const commandsPath = path.join(__dirname, 'commands');
async function loadCommands() {
  try {
    const commandFiles = (await fs.readdir(commandsPath)).filter(file => file.endsWith('.js'));
    console.log(`Komutlar yükleniyor: ${commandFiles.join(', ')}`);
    for (const file of commandFiles) {
      const command = require(path.join(commandsPath, file));
      if (command.name) {
        client.commands.set(command.name, command);
        console.log(`Komut yüklendi: ${command.name}`);
      } else {
        console.warn(`Uyarı: ${file} dosyasında komut adı eksik!`);
      }
    }
    console.log(`Toplam ${client.commands.size} komut yüklendi.`);
  } catch (error) {
    console.error('Komutlar yüklenirken hata oluştu:', error);
  }
}

const eventsPath = path.join(__dirname, 'events');
async function loadEvents() {
  try {
    const eventFiles = (await fs.readdir(eventsPath)).filter(file => file.endsWith('.js'));
    console.log(`Olaylar yükleniyor: ${eventFiles.join(', ')}`);
    for (const file of eventFiles) {
      const event = require(path.join(eventsPath, file));
      client.on(event.name, (...args) => event.execute(...args, client, config));
      console.log(`Olay yüklendi: ${event.name}`);
    }
  } catch (error) {
    console.error('Olaylar yüklenirken hata oluştu:', error);
  }
}

async function startBot() {
  await loadCommands();
  await loadEvents();
  await client.login(config.token);
}

startBot();