const AWS = require('aws-sdk')
const uuid = require('uuid/v4')

const get = (table, id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  return docClient.get({TableName: table, Key: {id}}).promise().then(d => d.Item)
}

const put = (table, item) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const newItem = Object.assign({ id: uuid() }, item)
  return docClient.put({TableName: table, Item: newItem}).promise().then(() => newItem)
}

const query = (table, filter) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  return docClient.query(Object.assign({ TableName: table }, filter)).promise().then(data => data.Items)
}

const scan = table => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  return docClient.scan({TableName: table}).promise().then(data => data.Items)
}

const increment = (table, id, attr, incr) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  return docClient.update({
    TableName: table,
    Key: { id },
    UpdateExpression: `SET ${attr} = ${attr} + :val`,
    ExpressionAttributeValues: {
      ':val': incr
    },
    ReturnValues: 'ALL_NEW'
  }).promise().then(d => d.Attributes)
}

const remove = (table, id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  return docClient.delete({TableName: table, Key: {id: id}}).promise()
}

module.exports = { get, put, query, scan, increment, remove }
