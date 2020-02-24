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
            async resolve(parentValue, { name, email, password: rawPassword }) {

                const password = await bcrypt.hash(rawPassword, 10);

                const user = await axios.post(
                    'http://localhost:3300/users', 
                    { name, email, password }
                ).then(res => res.data);

                const token = jwt.sign({ userId: user.id }, APP_SECRET);

                return { 
                    ...user, 
                    token
                };

            }
        },
        signIn: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parentValue, { email, password: checkPassword }) {
                const user = await axios.get(
                    `http://localhost:3300/users?email=${email}`
                ).then(res => res.data[0]);

                const matched = await bcrypt.compare(checkPassword, user.password);
                if (!matched) {
                    throw new Error('invalid password');
                }

                const token = jwt.sign({ userId: user.id }, APP_SECRET);

                return { 
                    ...user, 
                    token
                };
                
            }
        }
    }
})

module.exports = mutation;