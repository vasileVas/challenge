const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const UserType = require('./userType')

const { APP_SECRET } = require('../config');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signUp: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parentValue, { name, email, password }) {

                const encryptPass = await bcrypt.hash(password, 10);

                const user = await axios.post(
                    'http://localhost:3300/users', 
                    { name, email, encryptPass }
                ).then(res => res.data);

                const token = jwt.sign({ userId: user.id }, APP_SECRET);

                console.log(token, APP_SECRET)

                return { ...user, token };

            }
        }
    }
})

module.exports = mutation;