const { App } = require("@slack/bolt");
let axios;
axios = require('axios');
let dotenv;
dotenv = require('dotenv');
dotenv.config();

//xoxb-2623155770135-2662140614208-6PaexhkdE9SGVuZOlWP95aeX
let app;

app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode:true, 
    appToken: process.env.APP_TOKEN
});

app.command("/shout", async ({ command, ack, say }) => {
    try {
        await ack();
        console.log(command.user_name);
        //say("Hey, " + command.user_name + " Don't give up!");
        say({"blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": `:zap: Hello <@${command.user_name}>!`
              },
            
            }
          ]});
    } catch (error) {
        console.log("err")
        console.error(error);
    }
});

(async () => {
    const port = 3000
    // Start your app
    await app.start(process.env.PORT || port);
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
