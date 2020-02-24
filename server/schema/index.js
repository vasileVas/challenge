const {
    GraphQLSchema
} = require('graphql');
const rootQuery = require('./rootQuery');

module.exports = new GraphQLSchema({
    query: rootQuery
})