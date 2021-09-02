const { gql } = require('apollo-server');

const typeDefs = gql`
    type Person {
        name: String!
        height: String!
        mass: String!
        gender: String!
        homeworld: String!
    }
    type Pagination {
        hasMore: Boolean!
        nextPage: Int
        previousPage: Int
        pageCount: Int
    }
    type PeopleResponse {
        People : [Person]!
        Pagination: Pagination
    }
    type Query {
        People(pageNumber: Int): PeopleResponse!
        Person(name: String!) : [Person]!
    }
`;

module.exports = typeDefs;