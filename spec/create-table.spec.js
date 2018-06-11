// var AWS = require("aws-sdk");
//
// AWS.config.update({
//     region: "eu-west-1",
//     endpoint: "http://localhost:4567"
// });
//
// var docClient = new AWS.DynamoDB.DocumentClient();
// ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
// var tableParams = {
//     AttributeDefinitions: [
//         {
//             AttributeName: 'reportId',
//             AttributeType: 'S'
//         },
//     ],
//     KeySchema: [
//         {
//             AttributeName: 'reportId',
//             KeyType: 'HASH'
//         },
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 1,
//         WriteCapacityUnits: 1
//     },
//     TableName: 'reports',
//     StreamSpecification: {
//         StreamEnabled: false
//     }
// };
//
// var params = {
//     TableName: 'reports',
//     Item: {
//         reportId: "1234",
//         input_fields: "input-fields",
//         results: "results"
//     }
// };
//
//
// console.log("creating a new Table...");
// ddb.createTable(tableParams, function (err, data) {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data);
//         console.log("Adding a new item...");
//
//         docClient.put(params, function (err, data) {
//             if (err) {
//                 console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//             } else {
//                 console.log("Added item:", JSON.stringify(data, null, 2));
//             }
//         });
//     }
// });
