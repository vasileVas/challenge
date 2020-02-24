const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');

const PORT = 4000;
const app = express();
app.use(cors());

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})