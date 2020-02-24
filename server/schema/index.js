const {
    GraphQLSchema
} = require('graphql');
const rootQuery = require('./rootQuery');
const mutation = require('./mutation');

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation
})