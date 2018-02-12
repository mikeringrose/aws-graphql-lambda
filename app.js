'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const expressGraphQL = require('express-graphql')

const GraphQLSchema = require('./schema/schema')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))

app.use('/graphql',
  expressGraphQL(() => { return { graphiql: true, schema: GraphQLSchema } }))

module.exports = app
