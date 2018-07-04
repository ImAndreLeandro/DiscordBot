const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");


client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	client.user.setActivity(`${client.guilds.size} servers!`, {type: 'Watching'});
});

client.on("message", async message => {
	if (message.author.bot) return;
	if (message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command == "ping") {
		const m = await message.channel.send("Calculating...");
		const embed = {
			author: {
				name: `?? Latency!`,
				icon_url: client.user.avatarURL
			},
			description: `Pong! :ping_pong: \nLatency is **${m.createdTimestamp - message.createdTimestamp}**ms.\nAPI Latency is **${Math.round(client.ping)}**ms.`,
			color: 569815,
      		timestamp: new Date()
		};
		m.edit({embed});
	}

});

client.login(process.env.TOKEN);
