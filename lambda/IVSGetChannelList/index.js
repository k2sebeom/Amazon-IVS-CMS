const AWS = require("aws-sdk");

let dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    const resp = await dynamodb.scan({
        TableName:'IVSChannelTable',
    }).promise();
    const response = {
        statusCode: 200,
        body: resp,
    };
    return response;
};
