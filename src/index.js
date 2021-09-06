const { ApolloServer } = require('apollo-server');
require('dotenv').config();
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

server.listen({port: process.env.PORT || 3500}).then(() => {
	console.log(`
    Server is running!
    Listening on port ${process.env.PORT}`
	);
});