const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const { put, increment, remove } = require('../models')
const SongType = require('./song_type')
const LyricType = require('./lyric_type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString }
      },
      resolve (parentValue, { title }) {
        return put(process.env.SONGS_TABLE, { title })
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID }
      },
      resolve (parentValue, { content, songId }) {
        return put(process.env.LYRICS_TABLE, { content, songId, likes: 0 })
      }
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve (parentValue, { id }) {
        return increment(process.env.LYRICS_TABLE, id, 'likes', 1)
      }
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve (parentValue, { id }) {
        return remove(process.env.SONGS_TABLE, id)
      }
    }
  }
})

module.exports = mutation
