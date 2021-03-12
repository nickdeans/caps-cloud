'use strict';

const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/642201080499/pickup-queue',
  handleMessage: handler
});

function handler(message) {
  console.log(message);
}

app.on('error', (err) => {
  console.error(err.message);
});
app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();