const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const SWAPI = require('./datasources/swapi');
const resolvers = require('./resolvers');
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        swAPI: new SWAPI()
    })
});

server.listen({port: 3500}).then(() => {
    console.log(`
    Server is running!
    Listening on port 3500
    Explore at https://studio.apollographql.com/sandbox
  `);
})