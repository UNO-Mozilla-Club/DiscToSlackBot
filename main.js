const Discord = require('discord.js');
const { RTMClient, WebClient } = require('@slack/client');


const slack_client = new RTMClient(process.env.SLACK_TOKEN_BOT);
const web = new WebClient(process.env.SLACK_TOKEN_API);


slack_client.start();

slack_client.on('message', (message) => {
    // For structure of `message`, see https://api.slack.com/events/message
  
    // Skip messages that are from a bot or my own user ID
    if ( (message.subtype && message.subtype === 'bot_message') ||
         (!message.subtype && message.user === slack_client.activeUserId) ) {
      return;
    }
  
    // Log the message
    console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);

  });

const disc_client = new Discord.Client();

disc_client.on('ready', () => {
    console.log("Connected as " + disc_client.user.tag)

    // List servers the bot is connected to
    console.log("Servers:")
    disc_client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
    var testChannel = disc_client.channels.get("557035649786445826")
    //testChannel.send("Hello, World Test!")

    // const localFileAttachment = new Discord.Attachment('./assets/images/disneyCastle.jpg')
    // testChannel.send(localFileAttachment)

    // const webAttachment = new Discord.Attachment('https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png')
    // testChannel.send(webAttachment)

    disc_client.user.setActivity("testing.")
})

disc_client.on('message', (recievedMessage) => {
    if (recievedMessage.author == disc_client.user) {
        return
    }

    if (recievedMessage.content.startsWith("!")) {
        processCommand(recievedMessage)
    }

    sendMessageToSlack(recievedMessage)
    //recievedMessage.channel.send("Messaged recieved from " + recievedMessage.author.toString() + ": " + recievedMessage.content)
})

function sendMessageToSlack(recievedMessage) {
    slack_client.sendMessage(recievedMessage.content, 'CGZDLT1A4')
}

function processCommand(recievedMessage) {
    let fullCommand = recievedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    console.log("Command Recieved: " + primaryCommand)
    console.log("Arguments: " + arguments)

    if (primaryCommand == "help") {
        helpCommand(arguments, recievedMessage)
    } else {
        recievedMessage.channel.send("I don't understand the command. Try `!help`")
    }
}


function helpCommand(arguments, recievedMessage) {
    recievedMessage.channel.send("If you have a question about the bot message @sin90.")
}


disc_client.login(process.env.DISCORD_TOKEN_BOT)