const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        profile: {
            type: GraphQLString,
            resolve(parentValue, args) {
                return "Hello user"
            }
        }
    }
})

module.exports = rootQuery