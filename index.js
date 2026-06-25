const express = require("express");
const app = express();

require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const cron = require("node-cron");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

app.get("/", (req, res) => {
    res.send("Bot működik!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Webserver elindult");
});

client.once("ready", () => {
    console.log(`${client.user.tag} elindult!`);
});

// Blacklist verseny információk minden nap 13:00
cron.schedule("0 13 * * *", async () => {
    const channel = client.channels.cache.find(
        ch => ch.name === "💬》beszélgetés《"
    );

    if (!channel) return;

    await channel.send(`
🏁 Blacklist verseny információk

A versenyeket a <#1503890047055696082> szobában találjátok. Az 1v1 győzelem 1 pontot ér, vereségért nem jár pont.

A blacklistes játékosok hetente csak 1 embert hívhatnak ki a pontfarmolás elkerülése miatt. A verseny lehet gyorsasági vagy DP alapú, és mindig jelen kell lennie legalább 1 vezetőnek/adminnak/moderátornak.

❗ Ha nincs jelen vezető/admin/moderátor, akkor nem indulhat 1v1 verseny.

‼️ Ide ne írjatok. Sok sikert mindenkinek! 🫡
`);
});

// 3 hetes verseny emlékeztető minden nap 19:00
cron.schedule("0 16 * * *", async () => {
    try {
        const channel = await client.channels.fetch("1503883659189424253");

        if (!channel) return;

        await channel.send(`
📢 **3 hetes verseny emlékeztető!**

Ne feledjétek a 3 hetes célkitűzéses versenyt! 🔥

Tessék mindenkinek gyakorolni, vasárnap délután 15:00-tól alapító/vezető, admin vagy moderátor jelenlétében kerül sor a verseny lebonyolítására.

ℹ️ További információ:
<#1504078814882566194>

Sok sikert mindenkinek! 🚗💨
`);
    } catch (err) {
        console.error("CRON HIBA:", err);
    }
});

client.on("guildMemberAdd", async (member) => {
    const belepoRole = member.guild.roles.cache.find(
        role => role.name === "Belépő"
    );

    const tagRole = member.guild.roles.cache.find(
        role => role.name === "Tag"
    );

    const beszelgetesChannel = member.guild.channels.cache.find(
        ch => ch.name === "💬》beszélgetés《"
    );

    if (belepoRole) {
        await member.roles.add(belepoRole);
    }

    setTimeout(async () => {
        if (belepoRole) {
            await member.roles.remove(belepoRole);
        }

        if (tagRole) {
            await member.roles.add(tagRole);
        }

        if (beszelgetesChannel) {
            await beszelgetesChannel.send(`
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
    }, 120000);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    if (message.content === "!help") {
        return message.reply("A bot működik! ✅");
    }

    if (message.content === "!útmutató") {
        return message.reply(`
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