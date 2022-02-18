const AWS = require("aws-sdk");
AWS.config.apiVersions = {
  ivs: '2020-07-14'
};

let ivs = new AWS.IVS();
let dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    let params = {
        name: event.channelName,
        latencyMode: event.latencyMode,
        type: event.channelType,
        recordingConfigurationArn: "arn:aws:ivs:us-west-2:602439966658:recording-configuration/{recordginconfigarn}"
    }

    const resp = await ivs.createChannel(params).promise()
    await dynamodb.put({
        TableName:'IVSChannelTable',
        Item: {
            'ID': resp.channel.arn,
            'ChannelTitle': resp.channel.name,
            'StreamKey': resp.streamKey.value,
            'StreamStatus': 'inactive',
            'PlaybackUrl': resp.channel.playbackUrl,
            'ChannelMode': event.latencyMode,
            'ChannelType': event.channelType
        }
    }).promise();
    const response = {
        statusCode: 200,
        body: resp,
    };
    return response;
};
