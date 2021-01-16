const Discord = require('discord.js');

const client = new Discord.Client();

const { token } = require('./config.json');

const { readdirSync } = require('fs');

const { join } = require('path');
const Monitor = require('ping-monitor');

client.commands = new Discord.Collection();
const prefix = '$';

const myMonitor = new Monitor({
    address: '3.236.65.205',
    port: 80,
    interval: 1
});

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on("error", console.error);

client.on('ready', () => {
   var statusc = client.channels.cache.find(channel => channel.id === "798786438833373215");
   
    console.log('Project On');
    
    
      myMonitor.on('up', function (res, state) {
    const upembed = new Discord.MessageEmbed()
    .setTitle('Server Status')
    .setDescription('What Happening About Server')
    .addFields(
		{ name: 'Up/Down', value: 'Up'},
	)
	.setColor('#00d68f')
	statusc.send(upembed);
});
 
 
myMonitor.on('down', function (res, state) {
    const downembed = new Discord.MessageEmbed()
    .setTitle('Server Status')
    .setDescription('What Happening About Server')
    .addFields(
		{ name: 'Up/Down', value: 'Down'},
	  { name: 'Reason', value: 'Unknown'},
	)
	.setColor('#ff0303')
	statusc.send(downembed);
});
 
 
myMonitor.on('stop', function (res, state) {
    const stopembed = new Discord.MessageEmbed()
    .setTitle('Server Status')
    .setDescription('What Happening About Server')
    .addFields(
		{ name: 'Up/Down', value: 'Down'},
	  { name: 'Reason', value: 'Stop'},
	)
	.setColor('#ff0303')
	statusc.send(stopembedmbed);
});
 
 
myMonitor.on('error', function (error, res) {
    const errorembed = new Discord.MessageEmbed()
    .setTitle('Server Status')
    .setDescription('What Happening About Server')
    .addFields(
		{ name: 'Up/Down', value: 'Down'},
	  { name: 'Reason', value: 'Error'},
	)
	.setColor('#ff0303')
 statusc.send(errorembed);
});
 
 
myMonitor.on('timeout', function (error, res) {
    const timeoutembed = new Discord.MessageEmbed()
    .setTitle('Server Status')
    .setDescription('What Happening About Server')
    .addFields(
		{ name: 'Up/Down', value: 'Down'},
	  { name: 'Reason', value: 'Error'},
	)
	.setColor('#ff0303')
	statusc.send(timeoutembed);
});
});



client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
  
        client.on('guildMemberAdd', (member) => {
          const role = member.guild.roles.cache.find(mr => mr.name === 'Member')
          member.roles.add(role)
        })
  
  
  
  
        }
    }
})



client.login(token);
