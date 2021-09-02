const {ApolloServer, gql} = require('apollo-server');
const SWAPI = require('../datasources/swapi');
const typeDefs = require('../schema');
const resolvers = require('../resolvers');
describe('E2E tests', () => {
    it('Resolves People query', async () => {
        const mockPeople =  {
                    People: [
                        {
                            name: "Luke Skywalker",
                            height: "172",
                            gender: "male",
                            homeworld: "https://swapi.dev/api/planets/1/"
                          }
                    ],
                    Pagination: {
                        nextPage: 2,
                        hasMore: true,
                        previousPage: null
                    }
          };
          const PeopleQuery = gql`
          query People($peoplePageNumber: Int) {
            People(pageNumber: $peoplePageNumber) {
              People {
                name
                height
                gender
                homeworld
              },
              Pagination {
                nextPage
                hasMore
                previousPage
              }    
            }
          }
          `;
        const swAPI = new SWAPI();
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            dataSources: () => ({swAPI})
        });
        // mock the data source's underlying methods
        swAPI.getAllPeople = jest.fn(() => mockPeople);
        const res = await server.executeOperation({query: PeopleQuery, variables: { peoplePageNumber: 1}});
        // expect(res.data.People.People.length).toEqual(1);
        expect(res.data.People).toEqual(mockPeople);
    }),

    it('Resolves Person query', async () => {
        const mockResponse = [
            {
                name: "Luke Skywalker",
                height: "172",
                mass: "77",
                gender: "male",
                homeworld: "https://swapi.dev/api/planets/1/"
              }
        ];

        const PERSON_QUERY = gql`
            query Person($personName: String!) {
                Person(name: $personName) {
                name
                height
                mass
                gender
                homeworld
                }
            }
        `;

        const swAPI = new SWAPI();
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            dataSources: () => ({swAPI})
        });

        // mock the dataSource's underlying method
        swAPI.getPersonByName = jest.fn(() => mockResponse);
        const res = await server.executeOperation({query: PERSON_QUERY, variables: { personName: "Luke Skywalker"}});
        expect(res.data.Person.length).toEqual(1);
    }),
    it('Returns correct Person for search query', async () => {
        const mockResponse = [
            {
                name: "Luke Skywalker",
                height: "172",
                mass: "77",
                gender: "male",
                homeworld: "https://swapi.dev/api/planets/1/"
              }
        ];

        const PERSON_QUERY = gql`
            query Person($personName: String!) {
                Person(name: $personName) {
                name
                height
                mass
                gender
                homeworld
                }
            }
        `;

        const swAPI = new SWAPI();
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            dataSources: () => ({swAPI})
        });

        // mock the dataSource's underlying method
        swAPI.getPersonByName = jest.fn(() => mockResponse);
        const res = await server.executeOperation({query: PERSON_QUERY, variables: { personName: "Luke Skywalker"}});
        expect(res.data.Person[0].name).toEqual('Luke Skywalker');
    })
})