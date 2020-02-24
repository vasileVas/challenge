const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql');
const UserType = require('./userType');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { APP_SECRET, APP_SECRET_REFRESH } = require('../config');

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        profile: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)  },
                token: { type: new GraphQLNonNull(GraphQLString)  }
            },
            async resolve(parentValue, { id, token }) {

                const { userId } = jwt.verify(token, APP_SECRET);

                if (!userId) {
                    throw new Error('invalid token');
                }

                const user = await axios.get(
                    `http://localhost:3300/users/${userId}`
                ).then(res => res.data);

                const refreshToken = jwt.sign({ userId: user.id }, APP_SECRET_REFRESH);

                return {
                    ...user,
                    token,
                    refreshToken,
                }
            }
        }
    }
})

module.exports = rootQuery