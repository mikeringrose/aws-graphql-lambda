const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = graphql
const { query } = require('../models')
const LyricType = require('./lyric_type')

const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve (parentValue) {
        return query(process.env.LYRICS_TABLE, {
          IndexName: 'song-id-index',
          KeyConditionExpression: 'songId = :songId',
          ExpressionAttributeValues: {
            ':songId': parentValue.id
          }
        })
      }
    }
  })
})

module.exports = SongType
