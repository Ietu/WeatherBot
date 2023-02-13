const Discord = require('discord.js');
const client = new Discord.Client();
const weather = require('weather-js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith('!weather')) return;
    let location = message.content.split(" ").slice(1).join(" ");
    weather.find({search: location, degreeType: 'F'}, function(err, result) {
        if(err) message.channel.send(err);
        if(result === undefined || result.length === 0) {
            message.channel.send('**Please enter a valid location.**');
            return;
        }
        var current = result[0].current;
        var location = result[0].location;
        const embed = new Discord.MessageEmbed()
            .setTitle(`Weather for ${current.observationpoint}`)
            .setDescription(`${current.skytext}`)
            .setColor(0x00AE86)
            .addField('Timezone',`UTC${location.timezone}`, true)
            .addField('Degree Type',location.degreetype, true)
            .addField('Temperature',`${current.temperature} Degrees`, true)
            .addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Winds',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
        message.channel.send({embed});
    });
});

client.login(''); //TOKEN HERE