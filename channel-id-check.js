const { RTMClient, WebClient } = require('@slack/client');

const web = new WebClient(process.env.SLACK_TOKEN_API);

(async () => {
    // Load the current channels list asynchronously
    const res = await web.channels.list()

    console.log(res);
    // Take any channel for which the bot is a member

    // const msg = await slack_client.sendMessage('Hello, world!', 'CH1QN7WKE');
    // console.log(msg);

  })();