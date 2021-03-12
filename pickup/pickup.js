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
