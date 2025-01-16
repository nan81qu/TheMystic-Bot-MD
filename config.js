// Konfiguration laden
const config = require('./settings.js');

// Beispiel-Bot mit Baileys oder einer anderen Bibliothek
const { default: makeWASocket } = require('@whiskeysockets/baileys');

const startBot = async () => {
    const sock = makeWASocket();

    // Auf neue Nachrichten reagieren
    sock.ev.on('messages.upsert', async (msg) => {
        const message = msg.messages[0];
        if (!message.message) return;

        const text = message.message.conversation || '';
        const from = message.key.remoteJid;

        // Prüfen, ob der Text mit dem Präfix beginnt
        if (text.startsWith(config.prefix)) {
            const command = text.slice(1).trim().toLowerCase();

            switch (command) {
                case "menu":
                    await sock.sendMessage(from, { text: config.messages.menu });
                    break;

                case "info":
                    await sock.sendMessage(from, { text: `*🤖 Bot Name:* ${config.botName}\n*👤 Owner:* ${config.ownerName}` });
                    break;

                case "owner":
                    await sock.sendMessage(from, { text: `Kontaktiere den Besitzer unter: ${config.ownerNumber}` });
                    break;

                case "help":
                    await sock.sendMessage(from, { text: "Schreib .menu, um die verfügbaren Befehle zu sehen!" });
                    break;

                default:
                    await sock.sendMessage(from, { text: config.messages.default });
                    break;
            }
        }
    });
};

// Bot starten
startBot();
