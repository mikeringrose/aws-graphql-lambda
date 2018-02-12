const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql
const SongType = require('./song_type')
const LyricType = require('./lyric_type')
const { get, scan } = require('../models')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve () {
        return scan(process.env.SONGS_TABLE)
      }
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve (parentValue, { id }) {
        return get(process.env.SONGS_TABLE, id)
      }
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve (parentValue, { id }) {
        return get(process.env.LYRICS_TABLE, id)
      }
    }
  })
})

module.exports = RootQuery
