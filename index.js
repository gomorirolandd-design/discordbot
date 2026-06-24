const cron = require('node-cron');
cron.schedule('0 13 * * *', async () => {

    const channel = client.channels.cache.find(
        ch => ch.name === '💬》beszélgetés《'
    );

    if (channel) {
        channel.send(`
🏁 Blacklist verseny információk

A versenyeket a <#1503890047055696082> szobában találjátok. Az 1v1 győzelem 1 pontot ér, vereségért nem jár pont.

A blacklistes játékosok hetente csak 1 embert hívhatnak ki a pontfarmolás elkerülése miatt. A verseny lehet gyorsasági vagy DP alapú, és mindig jelen kell lennie legalább 1 vezetőnek/adminnak/moderátornak.
❗ Ha nincs jelen vezető/admin/moderátor, akkor nem indulhat 1v1 verseny.

‼️ Ide ne írjatok. Sok sikert mindenkinek! 🫡
`);
    }
});
console.log("CRON 19 ORARA ALLITVA");
cron.schedule('0 19 * * *', async () => {
    console.log("CRON ELINDULT!");

    if (!client.isReady()) {
        console.log("BOT MÉG NEM READY");
        return;
    }

    try {
        const channel = client.channels.cache.get("1503883659189424253");

        console.log(channel ? "MEGTALÁLTAM A CSATORNÁT" : "NEM TALÁLOM A CSATORNÁT");

        if (channel) {
            await channel.send(`
📢 **3 hetes verseny emlékeztető!**

Ne feledjétek a 3 hetes célkitűzéses versenyt! 🔥

Tessék mindenkinek gyakorolni, vasárnap délután 15:00-tól alapító/vezető, admin vagy moderátor jelenlétében kerül sor a verseny lebonyolítására.

ℹ️ További információ:
<#1504078814882566194>

Sok sikert mindenkinek! 🚗💨
`);
        }
} catch (err) {
    console.error("CRON HIBA:", err);
}
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