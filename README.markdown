# Durum Rol Botu

![Node.js](https://img.shields.io/badge/Node.js-v20.17.0-green.svg) 

Bu bir Discord botudur ve kullanıcıların durum mesajlarına göre otomatik rol atama/çıkarma ile loglama özelliklerini sunar. Bot, CroxyDB ile veri saklayarak ayarların botu kapatıp açtıktan sonra da kalıcı olmasını sağlar.

## Özellikler
- Kullanıcıların durum mesajına göre belirli bir rolü otomatik ekler/çıkarır.
- Loglama sistemi ile rol değişikliklerini bir kanalda kaydeder.
- Komutlar ile durum rolü ve log kanalını yapılandırma.
- Botu yeniden başlattığınızda ayarlar sıfırlanmaz (CroxyDB ile kalıcı saklama).

## Gereksinimler
- **Node.js**: v20.17.0 veya üstü
- **npm**: Node.js ile birlikte gelir

## Kurulum

### 1. Proje Dosyalarını Klonla
GitHub reposunu klonlayın:
```bash
git clone [https://github.com/RhantaDv/v14-Durum-Rol]
cd durum-rol-botu
```


### 2. Bağımlılıkları Yükle
Terminali açın ve proje dizinine gidin, ardından şu komutu çalıştırın:
```bash
npm install discord.js@14.15.3 croxydb@latest
```

### 3. Config Dosyasını Düzenle
`config.json` dosyasını açın ve aşağıdaki bilgileri doldurun:
- `"token"`: Discord botunuzun token'ı (Discord Developer Portal'dan alınır).
- `"prefix"`: Bot komutları için kullanılacak önek (örneğin, `!`).
- `"status"`: Botun çevrimiçi durumu (örneğin, `online`).
- `"ready"`: Botun oynuyor olarak göstereceği mesaj (örneğin, `Durum Rol Botu`).

Örnek `config.json`:
```json
{
  "token": "YOUR_BOT_TOKEN",
  "prefix": "!",
  "status": "online",
  "ready": "Durum Rol Botu"
}
```

### 4. Botu Çalıştır
Terminalde şu komutu çalıştırın:
```bash
node index.js
```

### 5. Discord Botunu Davet Et
- [Discord Developer Portal](https://discord.com/developers/applications) üzerinden botunuzu oluşturun ve token'ı alın.
- Botun gerekli izinlerini etkinleştirin (örneğin, `Guilds`, `GuildMembers`, `GuildPresences`).
- OAuth2 URL'sini kullanarak botu sunucunuza davet edin.

## Komutlar
Botu kullanmak için aşağıdaki komutları kullanabilirsiniz (önceki önek `!` ile):
- `!help` veya `!yardım`: Yardım menüsünü gösterir.
- `!durumrol-ayarla "Durum Mesajı" @rol`: Durum mesajına göre rol atamayı ayarlar.
- `!durumrol-kapat`: Durum rol sistemini kapatır.
- `!durumrol-log #log-kanalı`: Log kanalını ayarlar.
- `!durumrol-log-kapat`: Log sistemini kapatır.
- `!durumrol-status`: Sistem durumunu ve rolü alan kişi sayısını gösterir.

**Not:** Bu komutları kullanmak için `Rol Yönetme` iznine sahip olmalısınız.

## Dosya Yapısı
```
durum-rol-botu/
├── commands/
│   ├── help.js
│   ├── setDurumRol.js
│   ├── disableDurumRol.js
│   ├── setLogChannel.js
│   ├── disableLogChannel.js
│   └── status.js
├── events/
│   ├── ready.js
│   ├── messageCreate.js
│   └── presenceUpdate.js
├── config.json
├── index.js
├── package.json
└── README.md
```

## Sorun Giderme
- **CroxyDB Uyarıları:** Konsolda `croxydb` ile ilgili spam uyarılar görüyorsanız, modülü güncelleyin:
  ```bash
  npm install croxydb@latest
  ```
- **Hatalar:** Konsol loglarını kontrol edin ve [Issues](https://github.com/RhantaDv/v14-Durum-Rol/issues) bölümünde sorun bildirin.

## Katkı Sağlama
1. Repoyu fork edin.
2. Yeni bir branch oluşturun: `git checkout -b feature/ozellik-adi`.
3. Değişikliklerinizi yapın ve commit edin: `git commit -m "Yeni özellik eklendi"`.
4. Branch'i push edin: `git push origin feature/ozellik-adi`.
5. Pull request oluşturun.

## İletişim
Sorularınız için Discord sunucuma katılabilirsiniz: [Discord Link](https://discord.gg/vsc).  
*(Not: Kendi Discord davet linkinizi buraya ekleyin.)*

## Teşekkürler
Bu projeyi kullanan ve katkıda bulunan herkese teşekkürler!
