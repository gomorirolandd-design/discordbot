require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`${client.user.tag} elindult!`);
});

client.on('guildMemberAdd', async (member) => {

    const welcomeChannel = member.guild.channels.cache.find(
       ch => ch.name === '》beszélgetés《'
    );

    if (!welcomeChannel) return;

    welcomeChannel.send(`
👋 Üdv a szerveren!

📝 A Neved elé másold be, hogy: ZEN
Ezt #csapatról szobában megtalálod.

🚗 Ezután az ID-d és a neved küldd be a #nevek-id szobába.

❗ Fontos kérdés még:
Langyifagyi vagy-e? 😄
`);
});

client.on('messageCreate', message => {

    if (message.author.bot) return;

    if (message.content === '!help') {
        message.reply('A bot működik! ✅');
    }
});

client.login(process.env.TOKEN);