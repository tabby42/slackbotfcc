const { App } = require("@slack/bolt");
const dotenv = require('dotenv');
dotenv.config();
const fetch = require('cross-fetch');
let tags = 'education|faith|future|happiness|inspirational'

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode:true, 
    appToken: process.env.APP_TOKEN
});

app.command("/shout", async ({ command, ack, say }) => {
    try {
        await ack();
        fetch(`https://api.quotable.io/random?${tags}`)
        .then(response => {
            if(response.ok) {
                let rsp = response.json();
                //console.log(rsp);
                return rsp;
            } else {
                throw new Error('Request failed!');
            }
        })
        .then(jsonResponse => {
            //console.log(`${jsonResponse.content} —${jsonResponse.author}`)
            let qu = `${jsonResponse.content}`;
            let author = `${jsonResponse.author}`;
            say({"blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": `*Hey, ${command.user_name}* :zap:`
                  },
                },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": `*${qu}* :sunny:`
                  },
                },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": `:sparkles: – *${author}*`
                  },
                }
            ]});
        })
        
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
