const express = require('express');
const app = express();
const line = require('@line/bot-sdk');
const port = process.env.PORT || 5000;
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};
const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
  console.log(req.body);
  Promise.all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
});
const handleEvent = e => {
  var sendText = e.message.text;
  if (e.type !== 'message' || e.message.type !== 'text') {
    sendText = 'not a test message';
  }
  if (e.replyToken == 00000000000000000000000000000000) {
    return;
  }

  const echo = { type: 'text', text: sendText };
  return client.replyMessage(e.replyToken, echo);
};

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
