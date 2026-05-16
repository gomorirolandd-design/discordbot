const cron = require('node-cron');
cron.schedule('0 13 * * *', async () => {

    const channel = client.channels.cache.find(
        ch => ch.name === '💬》beszélgetés《'
    );

    if (channel) {
        channel.send(`
🏁 Blacklist verseny információk

A versenyeket a #🚗-drift szobában találjátok. Az 1v1 győzelem 1 pontot ér, vereségért nem jár pont. Ha valaki pontot szerez és nincs jelen vezető, írjatok egy adminnak/moderátornak vagy a <#1504590025638285352> szobába.

A blacklistes játékosok hetente csak 1 embert hívhatnak ki a pontfarmolás elkerülése miatt. A verseny lehet gyorsasági vagy DP alapú, és mindig jelen kell lennie legalább 1 vezetőnek/adminnak/moderátornak.

‼️ Ide ne írjatok. Sok sikert mindenkinek! 🫡
`);
    }

});
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot működik!");
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Webserver elindult");
});
require('dotenv').config();

const {
    Client,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`${client.user.tag} elindult!`);
});

client.on('guildMemberAdd', async (member) => {

    // Rangok
    const belepoRole = member.guild.roles.cache.find(
        role => role.name === 'Belépő'
    );

    const tagRole = member.guild.roles.cache.find(
        role => role.name === 'Tag'
    );

    // Szoba
    const beszelgetesChannel = member.guild.channels.cache.find(
        ch => ch.name === '💬》beszélgetés《'
    );

    // Belépő rang adása
    if (belepoRole) {
        await member.roles.add(belepoRole);
    }

    // 2 perc várakozás
    setTimeout(async () => {

        // Belépő rang levétele
        if (belepoRole) {
            await member.roles.remove(belepoRole);
        }

        // Tag rang adása
        if (tagRole) {
            await member.roles.add(tagRole);
        }

        // Üdvözlés
        if (beszelgetesChannel) {

            beszelgetesChannel.send(`
👋 Üdv a szerveren ${member}!

👥 A #👥csapatról szobában megtalálod a logónkat.
Másold ki és másold be a neved elé játékban és Discordon is!

⚠️ Fontos:
Ugyanaz legyen a neved játékban mint Discordon!

📸 Készíts képernyőképet és küldd be az ID-ddel együtt a
#🆔nevek-id
szobába!

Köszönöm! ❤️
`);
        }

    }, 120000); // 2 perc

});

client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.content === "!help") {
        message.reply("A bot működik! ✅");
    }
if (message.content === "!útmutató") {
    message.reply(`
👥 A #👥csapatról szobában megtalálod a logónkat.
Másold ki és másold be a neved elé játékban és Discordon is!

⚠️ Fontos:
Ugyanaz legyen a neved játékban mint Discordon!

📸 Készíts képernyőképet és küldd be az ID-ddel együtt a
#🆔nevek-id
szobába!

Köszönöm! ❤️
`);
}
});

client.login(process.env.TOKEN);