const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql
const { scan } = require('../models')

const LyricType = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: require('./song_type'),
      resolve (parentValue) {
        return scan(process.env.LYRICS_TABLE)
      }
    }
  })
})

module.exports = LyricType
