'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();
const faker = require('faker');

const topic = 'arn:aws:sns:us-west-2:642201080499:packages.fifo';
const orderItem = process.env[2];

const order = {
    storeName: '1-800-flowers',
    orderItem,
}

// Create publish parameters
var messageParams = {
    Message: 'Text Message test', /* required */
    PhoneNumber: '+10018082234355',
};

// Create promise and SNS service object
let publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(messageParams).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
    function (data) {
        console.log("MessageID is " + data.MessageId);
    }).catch(
        function (err) {
            console.error(err, err.stack);
        });

class Params {
    constructor() {
        this.MessageGroupId = 'test',
            this.MessageDeduplicationId = faker.random.uuid(),
            this.TopicArn = topic,
            this.Message = JSON.stringify(order)
    }
}
const params = new Params();

setInterval(() => {
    sns.publish(params).promise().then(console.log).catch(console.error);
}, 5000)
